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
import { usePostLandDetails } from "@/api/form/use-post-land-details";
import { toast } from "sonner";
import { useCreateLandProduct } from "@/api/ofbiz/use-create-land-product";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function LandDetailsFormStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formId, setFormId] = useState<string | null>(null);
  const [landOwnerIds, setLandOwnerIds] = useState<Record<number, string>>({});
  const [propertyIds, setPropertyIds] = useState<Record<number, string>>({});
  const [witnessIds, setWitnessIds] = useState<Record<number, string>>({});
  const router = useRouter();
  const queryClient = useQueryClient();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

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

  const { mutate: postLandDetails } = usePostLandDetails();
  const { mutate: createLandProduct } = useCreateLandProduct();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      title: "Bank Details",
      description: "Enter bank account information",
      icon: Building2,
    },
    {
      id: "landowners",
      title: "Land Owners",
      description: "Add land owner details",
      icon: Users,
    },
    {
      id: "property",
      title: "Property Details",
      description: "Enter property information",
      icon: Home,
    },
    {
      id: "witnesses",
      title: "Witnesses",
      description: "Add witness information",
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
    setIsSaving(true);
    try {
      const data = form.getValues();
      const formData = new FormData();

      // Debug log for current IDs
      console.log('Current formId before appending:', formId);
      console.log('Current landOwnerIds:', landOwnerIds);
      console.log('Current propertyIds:', propertyIds);
      console.log('Current witnessIds:', witnessIds);

      // Add form ID if it exists (for updates after step 2)
      if (formId) {
        console.log('Appending formId to request:', formId);
        formData.append("id", formId);
      }

      // Add current step
      formData.append("currentStep", currentStep.toString());

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
              toast.error("Failed to save progress: " + error.message);
              reject(error);
            },
          }
        );
      });
    } finally {
      setIsSaving(false);
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

      // Create land product only on final submission
      if (formId ) {
        createLandProduct(
          {
            productId: `P_${new Date().toISOString()
              .replace(/[-:]/g, "")
              .replace("T", "_")
              .slice(0, 15)}`,
            internalName: `Land Record - ${form.getValues("accountNumber")}`,
            longDescription: JSON.stringify({
              accountNumber: form.getValues("accountNumber"),
              landOwners: form.getValues("landOwners").map(
                (owner) => owner.landownerName
              ),
              location: location
                ? `${location.latitude},${location.longitude}`
                : "Not specified",
              created: new Date().toISOString().split(".")[0],
            }),
          },
          {
            onSuccess: () => {
              toast.success("Form submitted successfully!");
              router.push("/");
            },
            onError: (error: AxiosError) => {
              toast.error("Failed to create land product: " + error.message);
            },
          }
        );
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BankDetailComponent form={form} />;
      case 1:
        return <LandOwnersComponent form={form} />;
      case 2:
        return <PropertyDetailsComponent form={form} />;
      case 3:
        return <WitnessesComponent form={form} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <Card className="flex flex-col h-[800px]">
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
