import { Button } from "@/components/ui/button";

interface StepperNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function StepperNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev 
}: StepperNavigationProps) {
  return (
    <div className="flex-none h-16 px-3 sm:px-4 flex items-center border-t bg-white">
      <div className="flex justify-between w-full gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="w-[120px]"
        >
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className="w-[120px]"
        >
          {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
} 