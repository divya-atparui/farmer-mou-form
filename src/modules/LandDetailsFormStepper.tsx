"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "@/types/schema";
import type { FormData } from "./LandDetailsForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Check, 
  Building2, 
  Users, 
  Home,
  UserCheck,
} from "lucide-react";
import { MOUPreview } from "./MOUPreview";
import { StepperHeader } from "./stepper/StepperHeader";
import { StepperNavigation } from "./stepper/StepperNavigation";
import type { StepType } from "./stepper/types";

export function LandDetailsFormStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  
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
      bankDetailsPath: null,
      landOwners: [],
      propertyDetails: [],
      witnesses: [],
    },
  });

  const steps: StepType[] = [
    {
      id: 'bank',
      title: 'Bank Details',
      description: 'Enter bank account information',
      icon: Building2
    },
    {
      id: 'landowners', 
      title: 'Land Owners',
      description: 'Add land owner details',
      icon: Users
    },
    {
      id: 'property',
      title: 'Property Details',
      description: 'Enter property information',
      icon: Home
    },
    {
      id: 'witnesses',
      title: 'Witnesses',
      description: 'Add witness information',
      icon: UserCheck
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
  
    <div className="h-full bg-gray-50"> {/* Account for top navbar if any */}
      <div className=" max-w-[1600px] mx-auto px-2 sm:px-4 ">
        <div className="flex flex-col lg:flex-row gap-4 h-full ">
          {/* Form Section */}
          <div className="relative w-full lg:w-1/2 h-full">
            <Card className="h-full flex flex-col overflow-hidden">
              <StepperHeader steps={steps} currentStep={currentStep} />

              {/* Form Content Area - Flex grow */}
              <div className="flex-grow p-3 sm:p-4 min-h-0">
                <div className="h-full border rounded-lg bg-white/50 overflow-auto">
                  {currentStep === 0 && <div>Bank Details Form Placeholder</div>}
                  {currentStep === 1 && <div>Land Owners Form Placeholder</div>}
                  {currentStep === 2 && <div>Property Details Form Placeholder</div>}
                  {currentStep === 3 && <div>Witnesses Form Placeholder</div>}
                </div>
              </div>

              <StepperNavigation 
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={nextStep}
                onPrev={prevStep}
              />
            </Card>
          </div>

          {/* Preview Section */}
          <Card className="hidden lg:block flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Document Preview</h3>
                <p className="text-sm text-gray-500">Real-time preview of your MOU document</p>
              </div>
            </div>
            <div className="h-[600px] overflow-auto border rounded-lg bg-white">
              <div className="scale-[0.85] origin-top ">
                <MOUPreview data={form.watch()} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Preview Dialog Trigger */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <Button 
          onClick={() => {/* Handle mobile preview */}}
          size="sm"
          className="rounded-full shadow-lg"
        >
          Preview
        </Button>
      </div>
    </div>
  );
} 