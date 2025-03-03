import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface StepperNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => Promise<boolean>;
  onPrev: () => void;
  onSubmit: () => Promise<void>;
  isLoading?: boolean;
  isSaving?: boolean;
}

export function StepperNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev,
  onSubmit,
  isLoading = false,
  isSaving = false
}: StepperNavigationProps) {
  const handleNext = async () => {
    if (currentStep === totalSteps - 1) {
      await onSubmit();
    } else {
      await onNext();
    }
  };

  return (
    <div className="flex-none h-16 px-3 sm:px-4 flex items-center border-t bg-white">
      <div className="flex justify-between w-full gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentStep === 0 || isLoading || isSaving}
          className="w-[120px]"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isLoading || isSaving}
          className="w-[120px]"
        >
          {isLoading || isSaving ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {isLoading ? "Validating..." : "Saving..."}
            </span>
          ) : (
            currentStep === totalSteps - 1 ? 'Submit' : 'Next'
          )}
        </Button>
      </div>
    </div>
  );
} 