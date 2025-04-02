import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdatedLandDetailsForm from "../UpdatedLandDetailsForm";

interface UpdatedEditFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData?: LandDetails;
  initialStep?: number;
}

const UpdatedEditFormDialog = ({ 
  isOpen, 
  onOpenChange, 
  formData, 
  initialStep = 0 
}: UpdatedEditFormDialogProps) => {
  // Transform LandDetails to the format expected by UpdatedLandDetailsForm
  const transformedData = formData ? {
    id: formData.id?.toString(),
    landOwners: formData.landOwners?.map(owner => ({
      id: owner.id?.toString() || null,
      landownerName: owner.landownerName,
      aadhaar: owner.aadhaar,
      address: owner.address,
      email: owner.email,
      mobile: owner.mobile
    })),
    propertyDetails: formData.propertyDetails?.map(property => ({
      id: property.id?.toString() || null,
      itemName: property.itemName,
      cropDetails: property.cropDetails,
      totalArea: property.totalArea,
      surveyNumbers: property.surveyNumbers,
      location: property.location
    }))
  } : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle>Edit Land Details</DialogTitle>
          <DialogDescription>
            Make changes to the land details form. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        {transformedData && (
          <div className="flex-1 overflow-hidden">
            <UpdatedLandDetailsForm 
              isEditMode={true} 
              initialData={transformedData} 
              onEditComplete={() => onOpenChange(false)}
              initialStep={initialStep}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedEditFormDialog; 