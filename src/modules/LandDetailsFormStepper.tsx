/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "@/types/schema";
import { Card } from "@/components/ui/card";
import { Building2, Users, Home, UserCheck } from "lucide-react";

import { StepperHeader } from "./stepper/StepperHeader";
import { StepperNavigation } from "./stepper/StepperNavigation";
import type { StepType } from "./stepper/types";
import { BankDetailComponent } from "./components/BankDetailComponent";
import { LandOwnersComponent } from "./components/LandOwnersComponent";
import PropertyDetailsComponent from "./components/PropertyDetailsComponent";
import WitnessesComponent from "./components/WitnessesComponent";
import { useLandDetails } from "@/api/form/use-land-details";
import { toast } from "sonner";
import { useCreateLandProduct } from "@/api/ofbiz/use-create-land-product";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

interface LandDetailsFormStepperProps {
  isEditMode?: boolean;
  initialData?: LandDetails;
  onEditComplete?: () => void;
  initialStep?: number;
}

export function LandDetailsFormStepper({ 
  isEditMode = false, 
  initialData,
  onEditComplete,
  initialStep = 0
}: LandDetailsFormStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formId, setFormId] = useState<string | null>(initialData?.id?.toString() || null);
  const [landOwnerIds, setLandOwnerIds] = useState<Record<number, string>>({});
  const [propertyIds, setPropertyIds] = useState<Record<number, string>>({});
  const [witnessIds, setWitnessIds] = useState<Record<number, string>>({});
  const router = useRouter();
  const queryClient = useQueryClient();
  const { messages } = useLanguage();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Initialize IDs from initialData if in edit mode
  useEffect(() => {
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
      
      // Set witness IDs
      if (initialData.witnesses?.length) {
        const newWitnessIds: Record<number, string> = {};
        initialData.witnesses.forEach((witness, index) => {
          if (witness.id) {
            newWitnessIds[index] = witness.id.toString();
          }
        });
        setWitnessIds(newWitnessIds);
      }
    }
  }, [isEditMode, initialData]);

  const getLocation = () => {
    if (typeof window === "undefined") {
      return;
    }

    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              const isFirefox =
                typeof window !== "undefined" &&
                navigator.userAgent.toLowerCase().includes("firefox");
              if (isFirefox && window.location.protocol === "http:") {
                setLocationError(
                  "Firefox requires HTTPS for geolocation. Please use HTTPS or try Chrome."
                );
              } else {
                setLocationError(
                  "Location permission denied. Please enable location access."
                );
              }
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setLocationError("Location request timed out. Please try again.");
              break;
            default:
              setLocationError(`An unknown error occurred: ${error.message}`);
          }
        },
        options
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const { mutate: postLandDetails, isPending: isPostingLandDetails, isError: isPostingLandDetailsError } = useLandDetails();
  const { mutate: createLandProduct, isPending: isCreatingLandProduct, isError: isCreatingLandProductError } = useCreateLandProduct();
  
  // Update isSaving state when API calls are in progress
  useEffect(() => {
    setIsSaving(isPostingLandDetails || isCreatingLandProduct);
  }, [isPostingLandDetails, isCreatingLandProduct]);
  
  // Show error toast when API calls fail
  useEffect(() => {
    if (isPostingLandDetailsError) {
      toast.error("Failed to save form data. Please try again.");
    }
    if (isCreatingLandProductError) {
      toast.error("Failed to create land product. Please try again.");
    }
  }, [isPostingLandDetailsError, isCreatingLandProductError]);

  // Initialize form with default values or edit data
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode && initialData ? {
      accountNumber: initialData.accountNumber || "",
      accountHolder: initialData.accountHolder || "",
      bank: initialData.bank || "",
      branch: initialData.branch || "",
      ifscCode: initialData.ifscCode || "",
      swiftCode: initialData.swiftCode || "",
      bankDetailsUpload: null,
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
      witnesses: initialData.witnesses?.map(witness => ({
        id: witness.id?.toString() || null,
        name: witness.name || "",
        address: witness.address || "",
        note: witness.note || "",
      })) || [],
    } : {
      accountNumber: "",
      accountHolder: "",
      bank: "",
      branch: "",
      ifscCode: "",
      swiftCode: "",
      bankDetailsUpload: null,
      landOwners: [],
      propertyDetails: [],
      witnesses: [],
    },
    mode: "onTouched",
    criteriaMode: "firstError",
  });

  form.watch();

  const steps: StepType[] = [
    {
      id: "bank",
      title: messages.steps.bank.title,
      description: messages.steps.bank.description,
      icon: Building2,
    },
    {
      id: "landowners",
      title: messages.steps.landowners.title,
      description: messages.steps.landowners.description,
      icon: Users,
    },
    {
      id: "property",
      title: messages.steps.property.title,
      description: messages.steps.property.description,
      icon: Home,
    },
    {
      id: "witnesses",
      title: messages.steps.witnesses.title,
      description: messages.steps.witnesses.description,
      icon: UserCheck,
    },
  ];

  const validateStep = async (step: number): Promise<boolean> => {
    setIsValidating(true);
    try {
      let fieldsToValidate: (keyof FormSchemaType)[] = [];

      switch (step) {
        case 0:
          fieldsToValidate = [
            "accountNumber",
            "accountHolder",
            "bank",
            "branch",
            "ifscCode",
            "swiftCode",
            "bankDetailsUpload",
          ] as const;
          break;

        case 1:
          fieldsToValidate = ["landOwners"] as const;
          break;

        case 2:
          fieldsToValidate = ["propertyDetails"] as const;
          break;

        case 3:
          fieldsToValidate = ["witnesses"] as const;
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

  const saveCurrentStep = async () => {
    try {
      const data = form.getValues();
      const formData = new FormData();

      // Debug log for current IDs
      console.log('Current formId before appending:', formId);
      console.log('Current landOwnerIds:', landOwnerIds);
      console.log('Current propertyIds:', propertyIds);
      console.log('Current witnessIds:', witnessIds);
      console.log('Is edit mode:', isEditMode);

      // Add form ID if it exists (for updates after step 2 or in edit mode)
      if (formId) {
        console.log('Appending formId to request:', formId);
        formData.append("id", formId);
      }

      // Add current step
      formData.append("currentStep", currentStep.toString());
      
      // Add edit mode flag
      formData.append("isEditMode", isEditMode.toString());

      // Add location data if available
      if (location?.latitude && location?.longitude) {
        formData.append(
          "geoCoordinates",
          `${location.latitude},${location.longitude}`
        );
      }

      // Add step-specific data
      switch (currentStep) {
        case 0:
          // Bank details
          formData.append("accountNumber", data.accountNumber);
          formData.append("accountHolder", data.accountHolder);
          formData.append("bank", data.bank);
          formData.append("branch", data.branch);
          formData.append("ifscCode", data.ifscCode);
          formData.append("swiftCode", data.swiftCode);
          if (data.bankDetailsUpload instanceof File) {
            formData.append("bankDetailsUpload", data.bankDetailsUpload);
          }
          break;

        case 1:
          // Land owners
          data.landOwners.forEach((owner, index) => {
            // If we have an ID for this landowner, include it
            if (landOwnerIds[index]) {
              console.log(`Appending landowner ID for index ${index}:`, landOwnerIds[index]);
              formData.append(`landOwners[${index}].id`, landOwnerIds[index]);
            }

            formData.append(
              `landOwners[${index}].landownerName`,
              owner.landownerName
            );
            formData.append(`landOwners[${index}].aadhaar`, owner.aadhaar);
            formData.append(`landOwners[${index}].address`, owner.address);
            formData.append(`landOwners[${index}].email`, owner.email);
            formData.append(`landOwners[${index}].mobile`, owner.mobile);
            if (owner.aadhaarFile instanceof File) {
              formData.append(
                `landOwners[${index}].aadhaarFile`,
                owner.aadhaarFile
              );
            }
            if (owner.landDeedFile instanceof File) {
              formData.append(
                `landOwners[${index}].landDeedFile`,
                owner.landDeedFile
              );
            }
          });
          break;

        case 2:
          // Property details
          data.propertyDetails.forEach((property, index) => {
            // If we have an ID for this property, include it
            if (propertyIds[index]) {
              console.log(`Appending property ID for index ${index}:`, propertyIds[index]);
              formData.append(`propertyDetails[${index}].id`, propertyIds[index]);
            }

            formData.append(
              `propertyDetails[${index}].itemName`,
              property.itemName
            );
            formData.append(
              `propertyDetails[${index}].cropDetails`,
              property.cropDetails
            );
            formData.append(
              `propertyDetails[${index}].totalArea`,
              property.totalArea.toString()
            );
            formData.append(
              `propertyDetails[${index}].surveyNumbers`,
              property.surveyNumbers
            );
            formData.append(
              `propertyDetails[${index}].location`,
              property.location
            );
          });
          break;

        case 3:
          // Witnesses
          data.witnesses.forEach((witness, index) => {
            // If we have an ID for this witness, include it
            if (witnessIds[index]) {
              console.log(`Appending witness ID for index ${index}:`, witnessIds[index]);
              formData.append(`witnesses[${index}].id`, witnessIds[index]);
            }

            formData.append(`witnesses[${index}].name`, witness.name);
            formData.append(`witnesses[${index}].address`, witness.address);
            formData.append(`witnesses[${index}].note`, witness.note || "");
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

              // Store IDs based on current step
              if (response.data?.[0]) {
                // Store landowner IDs if we're on the landowner step
                if (currentStep === 1 && response.data[0].landOwners) {
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
                if (currentStep === 2 && response.data[0].propertyDetails) {
                  const newPropertyIds = { ...propertyIds };
                  response.data[0].propertyDetails.forEach((property: { id: string | number }, index: number) => {
                    if (property.id) {
                      console.log(`Setting property ID for index ${index}:`, property.id);
                      newPropertyIds[index] = property.id.toString();
                    }
                  });
                  setPropertyIds(newPropertyIds);
                }
                
                // Store witness IDs if we're on the witness step
                if (currentStep === 3 && response.data[0].witnesses) {
                  const newWitnessIds = { ...witnessIds };
                  response.data[0].witnesses.forEach((witness: { id: string | number }, index: number) => {
                    if (witness.id) {
                      console.log(`Setting witness ID for index ${index}:`, witness.id);
                      newWitnessIds[index] = witness.id.toString();
                    }
                  });
                  setWitnessIds(newWitnessIds);
                }
              }
              
              queryClient.invalidateQueries({
                queryKey: ["userLandDetails"],
              });
              
              resolve();
            },
            onError: (error: AxiosError) => {
              console.error('API Error:', error);
              console.error('Error response:', error.response?.data);
              reject(error);
            },
          }
        );
      });
    } catch (error) {
      console.error('Error preparing form data:', error);
      throw error;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (!isValid) return false;

    try {
      await saveCurrentStep();
      setCurrentStep((prev) => prev + 1);
      return true;
    } catch (error) {
      return false;
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
        createLandProduct(
          {
            productId: `P_${new Date().toISOString()
              .replace(/[-:]/g, "")
              .replace("T", "_")
              .slice(0, 15)}`,
            internalName: `Land Record - ${form.getValues("accountNumber")}`,
            longDescription: `Land Record for Account Number: ${form.getValues("accountNumber")} and Land Owner: ${form.getValues("landOwners").map(owner => owner.landownerName).join(", ")}`,
          },
          {
            onSuccess: () => {
              toast.success("Form submitted successfully!");
              router.push("/");
            }
          }
        );
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case 0:
          return <BankDetailComponent form={form} />;
        case 1:
          return <LandOwnersComponent form={form} landOwnerIds={landOwnerIds} />;
        case 2:
          return <PropertyDetailsComponent form={form} propertyIds={propertyIds} />;
        case 3:
          return <WitnessesComponent form={form} witnessIds={witnessIds} />;
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
}
