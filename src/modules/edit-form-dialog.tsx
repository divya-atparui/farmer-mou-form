import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LandDetailsFormStepper } from "./LandDetailsFormStepper";

interface EditFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData?: LandDetails;
  initialStep?: number;
}

const EditFormDialog = ({ isOpen, onOpenChange, formData, initialStep = 0 }: EditFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle>Edit Land Details</DialogTitle>
          <DialogDescription>
            Make changes to the land details form. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        {formData && (
          <div className="flex-1 overflow-hidden">
            <LandDetailsFormStepper 
              isEditMode={true} 
              initialData={formData} 
              onEditComplete={() => onOpenChange(false)}
              initialStep={initialStep}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditFormDialog;
