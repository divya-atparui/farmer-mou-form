import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepType } from "./types";

interface StepperHeaderProps {
  steps: StepType[];
  currentStep: number;
}

export function StepperHeader({ steps, currentStep }: StepperHeaderProps) {
  return (
    <div className="flex-none h-28 p-3 sm:p-4">
      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between p-2 pt-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.id} 
              className={cn(
                "flex flex-col items-center",
                "transition-all duration-300 p-1",
                index <= currentStep ? "opacity-100" : "opacity-50"
              )}
            >
              <div 
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full",
                  "flex items-center justify-center",
                  "border-2 transition-all duration-300",
                  index < currentStep 
                    ? "bg-primary border-primary text-white"
                    : index === currentStep
                    ? "border-primary text-primary bg-white"
                    : "border-gray-300 text-gray-500 bg-white"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </div>

              <div className="mt-2 text-center">
                <div 
                  className={cn(
                    "text-xs sm:text-sm font-medium",
                    index <= currentStep ? "text-primary" : "text-gray-500"
                  )}
                >
                  {step.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 