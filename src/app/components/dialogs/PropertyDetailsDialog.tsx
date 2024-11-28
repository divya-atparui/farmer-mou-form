/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Building2, Home } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyDetailsDialogProps {
  form: UseFormReturn<any>;
  propertyFields: any[];
  appendProperty: (value: any) => void;
  removeProperty: (index: number) => void;
}

export function PropertyDetailsDialog({
  form,
  propertyFields,
  appendProperty,
  removeProperty,
}: PropertyDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const { messages } = useLanguage();

  const onSave = async () => {
    const validationPromises = propertyFields.map((_, index) => {
      const fields = [
        `propertyDetails.${index}.itemName`,
        `propertyDetails.${index}.cropDetails`,
        `propertyDetails.${index}.totalArea`,
        `propertyDetails.${index}.surveyNumbers`,
        `propertyDetails.${index}.location`,
      ];
      return form.trigger(fields);
    });

    const results = await Promise.all(validationPromises);
    const isValid = results.every(result => result === true);

    if (isValid) {
      toast.success("Property details saved successfully!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 w-full"
          onClick={() => setOpen(true)}
        >
          <Home className="w-4 h-4" />
          {messages.form.buttons.addMore}
        </Button>
      </DialogTrigger>
      <DialogContent hideClose className="dialog-modal-style">
        <DialogHeader className="px-2 xs:px-4 pt-3 xs:pt-5">
          <div className="flex flex-col xs:flex-row xs:justify-between gap-2">
            <DialogTitle className="flex items-center gap-2 text-base xs:text-lg">
              <Home className="w-4 h-4" />
              {messages.form.sections.property.title}
            </DialogTitle>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendProperty({
                  itemName: "",
                  cropDetails: "",
                  totalArea: 0,
                  surveyNumbers: "",
                  location: "",
                })
              }
              className="w-full xs:w-40 text-xs rounded-sm drop-shadow-lg"
            >
              <Plus className="mr-1 h-3 w-3 xs:h-4 xs:w-4" />
              Add Property
            </Button>
          </div>

          <DialogDescription className="text-xs xs:text-sm text-start mt-1">
            {messages.form.sections.property.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 xs:mt-4 overflow-scroll px-2 xs:px-4 space-y-4 xs:space-y-6">
          <div className="max-h-[500px] overflow-y-auto -mx-6">
            <div className="sticky top-0 bg-background z-10 px-6 pb-4 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <Building2 className="w-5 h-5" />
                Property Details
              </div>
            </div>
            <div className="space-y-6 p-6">
              {propertyFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative p-2 sm:p-4 rounded-lg border bg-card"
                >
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`propertyDetails.${index}.itemName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{messages.form.sections.property.fields.itemName}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`propertyDetails.${index}.cropDetails`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{messages.form.sections.property.fields.cropDetails}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`propertyDetails.${index}.totalArea`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{messages.form.sections.property.fields.totalArea}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`propertyDetails.${index}.surveyNumbers`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{messages.form.sections.property.fields.surveyNumbers}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`propertyDetails.${index}.location`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{messages.form.sections.property.fields.location}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-8 w-8"
                    onClick={() => {
                      removeProperty(index);
                      if (propertyFields.length === 1) {
                        appendProperty({
                          itemName: "",
                          cropDetails: "",
                          totalArea: 0,
                          surveyNumbers: "",
                          location: "",
                        });
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-2 xs:mt-4 px-2 xs:px-4">
          <div className="flex flex-col xs:flex-row justify-between w-full gap-2 xs:gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full text-xs xs:text-sm h-8 xs:h-9"
              onClick={() => setOpen(false)}
            >
              {messages.form.buttons.close}
            </Button>
            <Button
              type="button"
              onClick={onSave}
              className="w-full text-xs xs:text-sm h-8 xs:h-9"
            >
              {messages.form.buttons.save}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
