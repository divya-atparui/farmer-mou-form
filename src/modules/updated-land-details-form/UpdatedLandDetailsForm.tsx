"use client"
import React, { useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatedFormSchema, UpdatedFormSchemaType } from "@/types/schema";
import { Card } from "@/components/ui/card";
import { Users, Home } from "lucide-react";

import { StepperHeader } from "../stepper/StepperHeader";
import { StepperNavigation } from "../stepper/StepperNavigation";
import type { StepType } from "../stepper/types";
import { UpdatedLandOwnersComponent } from "./components/UpdatedLandOwnersComponent";
import { UpdatedPropertyDetailsComponent } from "./components/UpdatedPropertyDetailsComponent";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useLandDetails } from "@/api/form/use-land-details";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCreateLandProduct } from "@/api/ofbiz/use-create-land-product";

// Define the types for the initial data
interface LandOwner {
  id?: string | null;
  landownerName?: string;
  aadhaar?: string;
  address?: string;
  email?: string;
  mobile?: string;
}

interface Property {
  id?: string | null;
  itemName?: string;
  cropDetails?: string;
  totalArea?: number;
  surveyNumbers?: string;
  location?: string;
}

interface UpdatedLandDetailsFormProps {
  isEditMode?: boolean;
  initialData?: {
    id?: string;
    landOwners?: LandOwner[];
    propertyDetails?: Property[];
  };
  onEditComplete?: () => void;
  initialStep?: number;
}

const UpdatedLandDetailsForm = ({
  isEditMode = false,
  initialData,
  onEditComplete,
  initialStep = 0
}: UpdatedLandDetailsFormProps) => {
  // State for managing the current step and validation status
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formId, setFormId] = useState<string | null>(initialData?.id || null);
  const [landOwnerIds, setLandOwnerIds] = useState<Record<number, string>>({});
  const [propertyIds, setPropertyIds] = useState<Record<number, string>>({});
  
  const { messages } = useLanguage();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  // Initialize API hooks
  const { mutate: postLandDetails, isPending: isPostingLandDetails } = useLandDetails();
  const { mutate: createLandProduct, isPending: isCreatingLandProduct, isError: isCreatingLandProductError } = useCreateLandProduct();
  
  // Update isSaving state when API calls are in progress
  React.useEffect(() => {
    setIsSaving(isPostingLandDetails || isCreatingLandProduct);
  }, [isPostingLandDetails, isCreatingLandProduct]);

  // Show error toast when API calls fail
  React.useEffect(() => {
    if (isCreatingLandProductError) {
      toast.error("Failed to create land product. Please try again.");
    }
  }, [isCreatingLandProductError]);

  // Initialize IDs from initialData if in edit mode
  React.useEffect(() => {
    if (isEditMode && initialData) {
      console.log('Initializing form with data:', initialData);
      
      // Set landowner IDs
      if (initialData.landOwners?.length) {
        const newLandOwnerIds: Record<number, string> = {};
        initialData.landOwners.forEach((owner, index) => {
          if (owner.id) {
            newLandOwnerIds[index] = owner.id.toString();
          }
        });
        setLandOwnerIds(newLandOwnerIds);
      }
      
      // Set property IDs
      if (initialData.propertyDetails?.length) {
        const newPropertyIds: Record<number, string> = {};
        initialData.propertyDetails.forEach((property, index) => {
          if (property.id) {
            newPropertyIds[index] = property.id.toString();
          }
        });
        setPropertyIds(newPropertyIds);
      }
    }
  }, [isEditMode, initialData]);

  // Initialize form with default values or edit data
  const form = useForm<UpdatedFormSchemaType>({
    resolver: zodResolver(updatedFormSchema),
    defaultValues: isEditMode && initialData ? {
      id: initialData.id,
      landOwners: initialData.landOwners?.map(owner => ({
        id: owner.id?.toString() || null,
        landownerName: owner.landownerName || "",
        aadhaar: owner.aadhaar || "",
        aadhaarFile: null,
        landDeedFile: null,
        address: owner.address || "",
        email: owner.email || "",
        mobile: owner.mobile || "",
      })) || [],
      propertyDetails: initialData.propertyDetails?.map(property => ({
        id: property.id?.toString() || null,
        itemName: property.itemName || "",
        cropDetails: property.cropDetails || "",
        totalArea: property.totalArea || 0,
        surveyNumbers: property.surveyNumbers || "",
        location: property.location || "",
      })) || [],
    } : {
      landOwners: [],
      propertyDetails: [],
    },
    mode: "onTouched",
    criteriaMode: "firstError",
  });

  // Watch for form changes
  form.watch();

  // Define the steps for the stepper
  const steps: StepType[] = [
    {
      id: "landowners",
      title: messages.steps?.landowners?.title || "Landowners",
      description: messages.steps?.landowners?.description || "Add landowner details",
      icon: Users,
    },
    {
      id: "property",
      title: messages.steps?.property?.title || "Property",
      description: messages.steps?.property?.description || "Add property details",
      icon: Home,
    },
  ];

  // Validate the current step
  const validateStep = async (step: number): Promise<boolean> => {
    setIsValidating(true);
    try {
      let fieldsToValidate: (keyof UpdatedFormSchemaType)[] = [];

      switch (step) {
        case 0:
          fieldsToValidate = ["landOwners"] as const;
          break;

        case 1:
          fieldsToValidate = ["propertyDetails"] as const;
          break;

        default:
          return true;
      }

      return await form.trigger(fieldsToValidate, {
        shouldFocus: true,
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Real API integration function to save the current step
  const saveCurrentStep = async () => {
    try {
      const data = form.getValues();
      const formData = new FormData();
      
      // Add form ID if it exists (for updates)
      if (formId) {
        console.log('Appending formId to request:', formId);
        formData.append("id", formId);
      }
      
      // Add current step and edit mode flag
      formData.append("currentStep", currentStep.toString());
      formData.append("isEditMode", isEditMode.toString());
      
      // Add step-specific data
      switch (currentStep) {
        case 0: // Landowners
          data.landOwners.forEach((owner, index) => {
            // Include ID if available for this landowner
            if (landOwnerIds[index]) {
              console.log(`Appending landowner ID for index ${index}:`, landOwnerIds[index]);
              formData.append(`landOwners[${index}].id`, landOwnerIds[index]);
            }
            
            formData.append(`landOwners[${index}].landownerName`, owner.landownerName);
            formData.append(`landOwners[${index}].aadhaar`, owner.aadhaar);
            formData.append(`landOwners[${index}].address`, owner.address);
            formData.append(`landOwners[${index}].email`, owner.email);
            formData.append(`landOwners[${index}].mobile`, owner.mobile);
            
            if (owner.aadhaarFile instanceof File) {
              formData.append(`landOwners[${index}].aadhaarFile`, owner.aadhaarFile);
            }
            
            if (owner.landDeedFile instanceof File) {
              formData.append(`landOwners[${index}].landDeedFile`, owner.landDeedFile);
            }
          });
          break;
          
        case 1: // Property details
          data.propertyDetails.forEach((property, index) => {
            // Include ID if available for this property
            if (propertyIds[index]) {
              console.log(`Appending property ID for index ${index}:`, propertyIds[index]);
              formData.append(`propertyDetails[${index}].id`, propertyIds[index]);
            }
            
            formData.append(`propertyDetails[${index}].itemName`, property.itemName);
            formData.append(`propertyDetails[${index}].cropDetails`, property.cropDetails);
            formData.append(`propertyDetails[${index}].totalArea`, property.totalArea.toString());
            formData.append(`propertyDetails[${index}].surveyNumbers`, property.surveyNumbers);
            formData.append(`propertyDetails[${index}].location`, property.location);
          });
          break;
      }
      
      return new Promise<void>((resolve, reject) => {
        postLandDetails(
          { formData },
          {
            onSuccess: (response) => {
              console.log('API Response:', response);
              console.log('Response data:', response.data);
              
              // Store form ID if we don't have it yet
              if (!formId && response.data?.[0]?.id) {
                const newFormId = response.data[0].id.toString();
                console.log('Setting new formId:', newFormId);
                setFormId(newFormId);
              }
              
              // Update ID mappings based on current step
              if (response.data?.[0]) {
                // Store landowner IDs if we're on the landowner step
                if (currentStep === 0 && response.data[0].landOwners) {
                  const newLandOwnerIds = { ...landOwnerIds };
                  response.data[0].landOwners.forEach((owner: { id: string | number }, index: number) => {
                    if (owner.id) {
                      console.log(`Setting landowner ID for index ${index}:`, owner.id);
                      newLandOwnerIds[index] = owner.id.toString();
                    }
                  });
                  setLandOwnerIds(newLandOwnerIds);
                }
                
                // Store property IDs if we're on the property step
                if (currentStep === 1 && response.data[0].propertyDetails) {
                  const newPropertyIds = { ...propertyIds };
                  response.data[0].propertyDetails.forEach((property: { id: string | number }, index: number) => {
                    if (property.id) {
                      console.log(`Setting property ID for index ${index}:`, property.id);
                      newPropertyIds[index] = property.id.toString();
                    }
                  });
                  setPropertyIds(newPropertyIds);
                }
              }
              
              // Invalidate query cache to ensure fresh data
              queryClient.invalidateQueries({
                queryKey: ["userLandDetails"],
              });
              
              // Notify user of success
              toast.success(`Step ${currentStep + 1} saved successfully`);
              resolve();
            },
            onError: (error: AxiosError) => {
              console.error('API Error:', error);
              console.error('Error response:', error.response?.data);
              toast.error(`Failed to save step ${currentStep + 1}`);
              reject(error);
            },
          }
        );
      });
    } catch (error) {
      console.error('Error preparing form data:', error);
      toast.error("An error occurred while preparing the form data");
      throw error;
    }
  };

  // Handle next step
  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (!isValid) return false;

    try {
      await saveCurrentStep();
      setCurrentStep((prev) => prev + 1);
      return true;
    } catch (error) {
      console.error('Error moving to next step:', error);
      return false;
    }
  };

  // Handle previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = await validateStep(currentStep);
    if (!isValid) return;

    try {
      await saveCurrentStep();
      
      // If in edit mode, just close the dialog
      if (isEditMode && onEditComplete) {
        toast.success("Form updated successfully!");
        onEditComplete();
        return;
      }
      
      // Create land product only on final submission in create mode
      if (formId) {
        // Extract the name of the first landowner for the description, if available
        const landOwners = form.getValues("landOwners");
        const landOwnerNames = landOwners.length > 0 
          ? landOwners.map(owner => owner.landownerName).join(", ")
          : "No landowners specified";
        
        createLandProduct(
          {
            productId: `P_${new Date().toISOString()
              .replace(/[-:]/g, "")
              .replace("T", "_")
              .slice(0, 15)}`,
            internalName: `Land Record - ${formId}`,
            longDescription: `Land Record for ID: ${formId} and Land Owner(s): ${landOwnerNames}`,
          },
          {
            onSuccess: () => {
              toast.success("Form submitted successfully!");
              
              // Optional: Redirect to home page or another page
              setTimeout(() => {
                router.push("/");
              }, 1500);
            },
            onError: (error) => {
              console.error("Error creating land product:", error);
              toast.error("Failed to create land product");
            }
          }
        );
      } else {
        // Show success message even if we don't have a formId yet
        toast.success("Form submitted successfully!");
        
        // Optional: Redirect to home page or another page
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Failed to submit form");
    }
  };

  // Render the current step
  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case 0:
          return <UpdatedLandOwnersComponent 
            form={form} 
            landOwnerIds={landOwnerIds} 
          />;
        case 1:
          return <UpdatedPropertyDetailsComponent 
            form={form} 
            propertyIds={propertyIds} 
          />;
        default:
          return null;
      }
    })();

    return (
      <div className={`${isEditMode ? 'p-4' : ''}`}>
        {stepContent}
      </div>
    );
  };

  return (
    <FormProvider {...form}>
      <Card className={`flex flex-col ${isEditMode ? 'h-full border-0 shadow-none' : 'h-[calc(100vh-theme(spacing.16))]'}`}>
        <StepperHeader steps={steps} currentStep={currentStep} />
        <div className="flex-1 overflow-auto">{renderStep()}</div>
        <StepperNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          isLoading={isValidating}
          isSaving={isSaving}
        />
      </Card>
    </FormProvider>
  );
};

export default UpdatedLandDetailsForm;