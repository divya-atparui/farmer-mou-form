/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Home className="w-6 h-6" />
            {messages.form.sections.property.title}
          </DialogTitle>
          <DialogDescription>
            {messages.form.sections.property.description}
          </DialogDescription>
        </DialogHeader>

        <Card className="max-h-[500px] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 pb-6 border-b">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Property Details
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              className="w-[120px]"
              onClick={() =>
                appendProperty({
                  itemName: "",
                  cropDetails: "",
                  totalArea: 0,
                  surveyNumbers: "",
                  location: "",
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {propertyFields.map((field, index) => (
              <div
                key={field.id}
                className="relative p-4 rounded-lg border bg-card"
              >
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-3 gap-4">
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
          </CardContent>
        </Card>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="outline"
              className="w-[120px]"
              onClick={() => {
                appendProperty({
                  itemName: "",
                  cropDetails: "",
                  totalArea: 0,
                  surveyNumbers: "",
                  location: "",
                });
              }}
            >
              Add More
            </Button>
            <Button type="button" className="w-[120px]" onClick={onSave}>
              {messages.form.buttons.save}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
