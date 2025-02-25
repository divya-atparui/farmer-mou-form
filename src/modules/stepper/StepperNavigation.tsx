import { Button } from "@/components/ui/button";

interface StepperNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => Promise<boolean>;
  onPrev: () => void;
  onSubmit: () => Promise<void>;
  isLoading?: boolean;
}

export function StepperNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev,
  onSubmit,
  isLoading = false
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
          disabled={currentStep === 0 || isLoading}
          className="w-[120px]"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isLoading}
          className="w-[120px]"
        >
          {isLoading 
            ? "Validating..." 
            : currentStep === totalSteps - 1 
            ? 'Submit' 
            : 'Next'
          }
        </Button>
      </div>
    </div>
  );
} 