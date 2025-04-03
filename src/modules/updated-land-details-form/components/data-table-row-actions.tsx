"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash, Loader2, Users, Home } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteLandDetails } from "@/api/form/use-land-details";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import UpdatedEditFormDialog from "./UpdatedEditFormDialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const queryClient = useQueryClient();
  const { messages } = useLanguage();
  
  const rowActions = messages["row-actions"];
  
  const { mutate: deleteLandDetails, isPending: isDeleting } = useDeleteLandDetails();

  const handleDelete = () => {
    const landDetails = row.original as LandDetails;
    
    if (!landDetails.id) {
      toast.error("Cannot delete: Missing ID");
      setShowDeleteDialog(false);
      return;
    }
    
    deleteLandDetails(
      { id: landDetails.id.toString() },
      {
        onSuccess: () => {
          toast.success("Land details deleted successfully");
          // Invalidate queries to refresh the data
          queryClient.invalidateQueries({
            queryKey: ["userLandDetails"],
          });
          setShowDeleteDialog(false);
        },
        onError: (error) => {
          console.error("Error deleting land details:", error);
          toast.error(`Failed to delete: ${error.message}`);
          setShowDeleteDialog(false);
        },
      }
    );
  };

  // Updated to handle only two steps - landowners (0) and property (1)
  const handleEditWithStep = (step: number) => {
    // Map the old step numbers to new ones (0 for landowners, 1 for property)
    const mappedStep = step === 1 ? 0 : 1; // 1 (landowners) -> 0, 2 (property) -> 1
    setInitialStep(mappedStep);
    setShowEditDialog(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {/* Landowners details button */}
        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditWithStep(1)} // Keep as 1 for consistency with existing code
                disabled={isDeleting}
              >
                <Users className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>{rowActions.landowners}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Property details button */}
        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditWithStep(2)} // Keep as 2 for consistency with existing code
                disabled={isDeleting}
              >
                <Home className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>{rowActions.property}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Delete button */}
        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>{rowActions.delete}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{rowActions.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {rowActions.deleteConfirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{rowActions.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {rowActions.deleting}
                </span>
              ) : (
                rowActions.deleteButton
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Updated Edit Form Dialog */}
      <UpdatedEditFormDialog 
        isOpen={showEditDialog} 
        onOpenChange={setShowEditDialog} 
        formData={row.original as LandDetails}
        initialStep={initialStep}
      />
    </>
  );
}
