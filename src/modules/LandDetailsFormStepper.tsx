"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Building2, Users, Home, UserCheck } from "lucide-react";
import { MOUPreview } from "./MOUPreview";
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
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import JsonDataView from "./JsonDataView";
import JsonDataKannadaView from "./JsonDataKannadaView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export function LandDetailsFormStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const { mutate: postLandDetails } = usePostLandDetails();
  const { mutate: createLandProduct } = useCreateLandProduct();
  const { messages } = useLanguage();
  const [jsonData, setJsonData] = useState<LandDetailsResponse | null>(null);
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      accountHolder: "",
      bank: "",
      branch: "",
      dateCreated: "",
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
            "dateCreated",
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
              if (key === 'landOwners' && 'landownerName' in item) {
                const landOwner = item as {
                  landownerName: string;
                  signature: string;
                  aadhaar: string;
                  address: string;
                  date: string;
                  email: string;
                  mobile: string;
                };
                
                formDataValues.append(`landOwners[${index}].landownerName`, landOwner.landownerName);
                formDataValues.append(`landOwners[${index}].signature`, landOwner.signature);
                formDataValues.append(`landOwners[${index}].aadhaar`, landOwner.aadhaar);
                formDataValues.append(`landOwners[${index}].address`, landOwner.address);
                formDataValues.append(`landOwners[${index}].date`, landOwner.date);
                formDataValues.append(`landOwners[${index}].email`, landOwner.email);
                formDataValues.append(`landOwners[${index}].mobile`, landOwner.mobile);
              }
              
              // Type guard for propertyDetails
              else if (key === 'propertyDetails' && 'itemName' in item) {
                const property = item as {
                  itemName: string;
                  cropDetails: string;
                  totalArea: number;
                  surveyNumbers: string;
                  location: string;
                };
                
                formDataValues.append(`propertyDetails[${index}].itemName`, property.itemName);
                formDataValues.append(`propertyDetails[${index}].cropDetails`, property.cropDetails);
                formDataValues.append(`propertyDetails[${index}].totalArea`, String(property.totalArea));
                formDataValues.append(`propertyDetails[${index}].surveyNumbers`, property.surveyNumbers);
                formDataValues.append(`propertyDetails[${index}].location`, property.location);
              }
              
              // Type guard for witnesses
              else if (key === 'witnesses' && 'name' in item) {
                const witness = item as {
                  name: string;
                  address: string;
                  note: string;
                  date: string;
                };
                
                formDataValues.append(`witnesses[${index}].name`, witness.name);
                formDataValues.append(`witnesses[${index}].address`, witness.address);
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
      if (data.bankDetailsUpload  instanceof File) {
        formDataValues.append('bankDetailsUpload', data.bankDetailsUpload);
      }

      // Land Owners files with type checking
      if (Array.isArray(data.landOwners)) {
        data.landOwners.forEach((owner, index) => {
          if ('aadhaarFile' in owner && owner.aadhaarFile instanceof File) {
            formDataValues.append(`landOwners[${index}].aadhaarFile`, owner.aadhaarFile);
          }
          if ('landDeedFile' in owner && owner.landDeedFile instanceof File) {
            formDataValues.append(`landOwners[${index}].landDeedFile`, owner.landDeedFile);
          }
        });
      }

      // Log the FormData entries for verification
      postLandDetails(
        {
          formData:formDataValues
        },
        {
          onSuccess: (data) => {
            setJsonData(data);
            setShowJsonPreview(true);
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
  Land Owners: ${data.data[0].landOwners.map((owner) => owner.landownerName).join(", ")}
  Location: ${data.data[0].geoCoordinates || "Not specified"}
  Created: ${new Date().toLocaleString()}`,
              },
              {
                onSuccess: () => {
                  toast.success("Land Product created successfully!");
                },
                onError: (error: any) => {
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
      )
      
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };
  const handlePrint = () => {
    const printContent = document.getElementById("mou-content");
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore all event listeners
    }
  };

  return (
    <FormProvider {...form}>
      <div className="h-full bg-gray-50">
        {" "}
        {/* Account for top navbar if any */}
        <div className=" max-w-[1600px] mx-auto px-2 sm:px-4 ">
          <div className="flex flex-col lg:flex-row gap-4 h-full ">
            {/* Form Section */}
            <div className="relative w-full lg:w-1/2 h-full">
              <Card className="h-full flex flex-col overflow-hidden">
                <StepperHeader steps={steps} currentStep={currentStep} />

                {/* Form Content Area - Flex grow */}
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

            {/* Preview Section */}
            <Card className="hidden lg:block flex-1 max-h-[800px]">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Document Preview</CardTitle>
                <CardDescription>
                  Real-time preview of your MOU document
                </CardDescription>
              </div>
              <Badge
                onClick={() => setShowJsonPreview(true)}
                variant="default"
                className="cursor-pointer "
              >
                Live Preview
              </Badge>
            </div>
          </CardHeader>
          <div className="h-full flex items-start justify-center">
            <CardContent className="h-[700px] overflow-scroll no-scrollbar">
              <MOUPreview data={form.watch()} />
            </CardContent>
          </div>
        </Card>
          </div>
        </div>
        {/* Mobile Preview Dialog Trigger */}
        <div className="fixed bottom-4 right-4 lg:hidden z-50">
          <Button
            onClick={() => {
              /* Handle mobile preview */
            }}
            size="sm"
            className="rounded-full shadow-lg"
          >
            Preview
          </Button>
        </div>
        <Dialog open={showJsonPreview} onOpenChange={setShowJsonPreview}>
        <DialogContent
          hideClose
          className="w-[calc(100vw-2rem)] sm:w-[calc(100vw-1rem)] sm:max-w-[1200px] h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)]  p-2 sm:p-6"
        >
          <DialogHeader className="space-y-2 sm:space-y-4">
            <DialogTitle className="text-center text-lg sm:text-xl md:text-2xl">
              Memorandum of Understanding (MoU)
            </DialogTitle>
            <div className="flex justify-end">
              <Button
                onClick={handlePrint}
                variant="default"
                className="text-xs sm:text-sm px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2"
              >
                Print MoU
              </Button>
            </div>
          </DialogHeader>

          <div id="mou-content" className="mt-2 sm:mt-4 overflow-scroll">
            {messages.lang === "en" ? (
              <JsonDataView data={jsonData} />
            ) : (
              <JsonDataKannadaView data={jsonData} />
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowJsonPreview(false)}
              variant="default"
              className="w-32 sm:w-40"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </FormProvider>
  );
}
