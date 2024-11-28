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
import { Plus, Trash2, UserCheck } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface WitnessesDialogProps {
  form: UseFormReturn<any>;
  witnessFields: any[];
  appendWitness: (value: { name: string; address: string; note: string; date: string; }) => void;
  removeWitness: (index: number) => void;
}

export function WitnessesDialog({
  form,
  witnessFields,
  appendWitness,
  removeWitness,
}: WitnessesDialogProps) {
  const [open, setOpen] = useState(false);
  const { messages } = useLanguage();

  const onSave = async () => {
    const validationPromises = witnessFields.map((_, index) => {
      const fields = [
        `witnesses.${index}.name`,
        `witnesses.${index}.address`,
        `witnesses.${index}.note`,
        `witnesses.${index}.date`,
      ];
      return form.trigger(fields);
    });

    const results = await Promise.all(validationPromises);
    const isValid = results.every(result => result === true);

    if (isValid) {
      toast.success("Witnesses details saved successfully!");
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
          <UserCheck className="w-4 h-4" />
          {messages.form.buttons.addMore}
        </Button>
      </DialogTrigger>
      <DialogContent hideClose className="dialog-modal-style">
        <DialogHeader className="px-2 xs:px-4 pt-3 xs:pt-6">
          <div className="flex flex-col xs:flex-row xs:justify-between gap-2">
            <DialogTitle className="flex items-center gap-2 text-base xs:text-lg">
              <UserCheck className="w-4 h-4" />
              {messages.form.sections.witnesses.title}
            </DialogTitle>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendWitness({
                  name: "",
                  address: "",
                  note: "",
                  date: new Date().toISOString().split("T")[0],
                })
              }
              className="w-full xs:w-40 text-xs rounded-sm drop-shadow-lg"
            >
              <Plus className="mr-1 h-3 w-3 xs:h-4 xs:w-4" />
              Add Witness
            </Button>
          </div>

          <DialogDescription className="text-xs xs:text-sm text-start mt-1">
            {messages.form.sections.witnesses.description}
          </DialogDescription>
        </DialogHeader>

        <div className="dialog-content-scroll">
          {witnessFields.length === 0 ? (
            <div className="dialog-empty-state">
              <UserCheck className="dialog-empty-state-icon" />
              <h3 className="dialog-empty-state-title">No Witnesses Added</h3>
              <p className="dialog-empty-state-text">Please add a witness using the button above</p>
            </div>
          ) : (
            <div className="space-y-4 xs:space-y-6">
              {witnessFields.map((field, index) => (
                <div
                  key={field.name}
                  className="relative p-3 xs:p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="space-y-3 xs:space-y-4">
                    <div className="grid grid-cols-1 gap-3 xs:gap-6">
                      <FormField
                        control={form.control}
                        name={`witnesses.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs xs:text-sm font-medium">
                              {messages.form.sections.witnesses.fields.name}
                            </FormLabel>
                            <FormControl>
                              <Input className="text-xs xs:text-sm h-8 xs:h-9" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] xs:text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`witnesses.${index}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs xs:text-sm font-medium">
                              {messages.form.sections.witnesses.fields.date}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="text-xs xs:text-sm h-8 xs:h-9" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] xs:text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`witnesses.${index}.address`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs xs:text-sm font-medium">
                              {messages.form.sections.witnesses.fields.address}
                            </FormLabel>
                            <FormControl>
                              <Input className="text-xs xs:text-sm h-8 xs:h-9" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] xs:text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`witnesses.${index}.note`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs xs:text-sm font-medium">
                              {messages.form.sections.witnesses.fields.note}
                            </FormLabel>
                            <FormControl>
                              <Input className="text-xs xs:text-sm h-8 xs:h-9" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] xs:text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-1 xs:-right-2 -top-1 xs:-top-2 h-6 w-6 xs:h-8 xs:w-8 rounded-full shadow-lg"
                    onClick={() => {
                      removeWitness(index);
                      if (witnessFields.length === 1) {
                        appendWitness({
                          name: "",
                          address: "",
                          note: "",
                          date: new Date().toISOString().split("T")[0],
                        });
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3 xs:h-4 xs:w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
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
