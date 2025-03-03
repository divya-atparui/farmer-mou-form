"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash, Loader2, Building2, Users, Home, UserCheck } from "lucide-react";
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
import EditFormDialog from "../edit-form-dialog";
import { useDeleteLandDetails } from "@/api/form/use-land-details";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const queryClient = useQueryClient();
  
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

  const handleEditWithStep = (step: number) => {
    setInitialStep(step);
    setShowEditDialog(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditWithStep(0)}
                disabled={isDeleting}
              >
                <Building2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>Edit Bank Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditWithStep(1)}
                disabled={isDeleting}
              >
                <Users className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>Edit Land Owners</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditWithStep(2)}
                disabled={isDeleting}
              >
                <Home className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>Edit Property Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleEditWithStep(3)}
                disabled={isDeleting}
              >
                <UserCheck className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5} className="text-xs">
              <p>Edit Witnesses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
              <p>Delete Record</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected record and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Form Dialog */}
      <EditFormDialog 
        isOpen={showEditDialog} 
        onOpenChange={setShowEditDialog} 
        formData={row.original as LandDetails}
        initialStep={initialStep}
      />
    </>
  );
}