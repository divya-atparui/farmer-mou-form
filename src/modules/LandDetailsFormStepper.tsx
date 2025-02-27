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
export function LandDetailsFormStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string>("");

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
        case 0: // Bank Details
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

        case 1: // Land Owners
          fieldsToValidate = ["landOwners"] as const;
          break;

        case 2: // Property Details
          fieldsToValidate = ["propertyDetails"] as const;
          break;

        case 3: // Witnesses
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

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return true;
    }
    return false;
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
      const data = form.getValues();
      console.log("Raw Form Data:", data);

      const formDataValues = new FormData();

      // Append non-file fields first
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined && !(value instanceof File)) {
          // Handle arrays with type checking
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              // Type guard for landOwners
              if (key === "landOwners" && "landownerName" in item) {
                const landOwner = item as {
                  landownerName: string;
                  aadhaar: string;
                  aadhaarFile: File | null;
                  landDeedFile: File | null;
                  address: string;
                  email: string;
                  mobile: string;
                };

                formDataValues.append(
                  `landOwners[${index}].landownerName`,
                  landOwner.landownerName
                );
                formDataValues.append(
                  `landOwners[${index}].aadhaar`,
                  landOwner.aadhaar
                );
                formDataValues.append(
                  `landOwners[${index}].address`,
                  landOwner.address
                );
                formDataValues.append(
                  `landOwners[${index}].email`,
                  landOwner.email
                );
                formDataValues.append(
                  `landOwners[${index}].mobile`,
                  landOwner.mobile
                );
              }

              // Type guard for propertyDetails
              else if (key === "propertyDetails" && "itemName" in item) {
                const property = item as {
                  itemName: string;
                  cropDetails: string;
                  totalArea: number;
                  surveyNumbers: string;
                  location: string;
                };

                formDataValues.append(
                  `propertyDetails[${index}].itemName`,
                  property.itemName
                );
                formDataValues.append(
                  `propertyDetails[${index}].cropDetails`,
                  property.cropDetails
                );
                formDataValues.append(
                  `propertyDetails[${index}].totalArea`,
                  String(property.totalArea)
                );
                formDataValues.append(
                  `propertyDetails[${index}].surveyNumbers`,
                  property.surveyNumbers
                );
                formDataValues.append(
                  `propertyDetails[${index}].location`,
                  property.location
                );
              }

              // Type guard for witnesses
              else if (key === "witnesses" && "name" in item) {
                const witness = item as {
                  name: string;
                  address: string;
                  note: string;
                  date: string;
                };

                formDataValues.append(`witnesses[${index}].name`, witness.name);
                formDataValues.append(
                  `witnesses[${index}].address`,
                  witness.address
                );
                formDataValues.append(`witnesses[${index}].note`, witness.note);
                formDataValues.append(`witnesses[${index}].date`, witness.date);
              }
            });
          } else {
            // Handle simple fields
            formDataValues.append(key, String(value));
          }
        }
      });

      // Append files separately
      if (data.bankDetailsUpload instanceof File) {
        formDataValues.append("bankDetailsUpload", data.bankDetailsUpload);
      }

      if (!!location && location.latitude && location.longitude) {
        formDataValues.append(
          "geoCoordinates",
          `${location.latitude},${location.longitude}`
        );
      }

      // Land Owners files with type checking
      if (Array.isArray(data.landOwners)) {
        data.landOwners.forEach((owner, index) => {
          if ("aadhaarFile" in owner && owner.aadhaarFile instanceof File) {
            formDataValues.append(
              `landOwners[${index}].aadhaarFile`,
              owner.aadhaarFile
            );
          }
          if ("landDeedFile" in owner && owner.landDeedFile instanceof File) {
            formDataValues.append(
              `landOwners[${index}].landDeedFile`,
              owner.landDeedFile
            );
          }
        });
      }
      // Log the FormData entries for verification
      postLandDetails(
        {
          formData: formDataValues,
        },
        {
          onSuccess: (data) => {
            createLandProduct(
              {
                productId: `${data.data[0].id}_${new Date().toISOString()}`,
                internalName: `Land Record - ${
                  data.data[0].accountNumber
                } (${data.data[0].landOwners
                  .map((owner) => owner.landownerName)
                  .join(", ")})`,
                longDescription: `Land Details:
            Account Number: ${data.data[0].accountNumber}
            Land Owners: ${data.data[0].landOwners
              .map((owner) => owner.landownerName)
              .join(", ")}
            Location: ${data.data[0].geoCoordinates || "Not specified"}
            Created: ${new Date().toLocaleString()}`,
              },
              {
                onSuccess: (data) => {
                  toast.success("Land Product created successfully!");
                  console.log(data);
                },
                onError: (error: AxiosError) => {
                  console.log(error);
                  toast.error("Please Try Again" + error.message);
                },
              }
            );
          },
          onError: (error) => {
            console.log(error);
            toast.error("Please Try Again" + error.message);
          },
        }
      );
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="h-full bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4">
          <div className="h-full">
            <div className="relative h-full">
              <Card className="h-full flex flex-col overflow-hidden">
                <StepperHeader steps={steps} currentStep={currentStep} />

                <div className="flex-grow p-3 sm:p-4 min-h-0">
                  <div className="h-[600px] border rounded-lg bg-white/50 overflow-auto">
                    {currentStep === 0 && <BankDetailComponent form={form} />}
                    {currentStep === 1 && <LandOwnersComponent form={form} />}
                    {currentStep === 2 && (
                      <PropertyDetailsComponent form={form} />
                    )}
                    {currentStep === 3 && <WitnessesComponent form={form} />}
                  </div>
                </div>

                <StepperNavigation
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  onNext={nextStep}
                  onPrev={prevStep}
                  onSubmit={handleSubmit}
                  isLoading={isValidating}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
