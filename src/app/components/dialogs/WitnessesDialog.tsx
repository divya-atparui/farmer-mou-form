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
import { Plus, Trash2, Users, UserCheck } from "lucide-react";
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
      <DialogContent className="sm:max-w-[800px] max-w-[95vw] w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <UserCheck className="w-4 h-4 sm:w-6 sm:h-6" />
            {messages.form.sections.witnesses.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {messages.form.sections.witnesses.description}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[500px] overflow-y-auto -mx-6">
          <div className="sticky top-0 bg-background z-10 px-6 pb-4 border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Witnesses
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() =>
                appendWitness({
                  name: "",
                  address: "",
                  note: "",
                  date: new Date().toISOString().split("T")[0],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Witness</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
          <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {witnessFields.map((field, index) => (
              <div
                key={field.name}
                className="relative p-2 sm:p-4 rounded-lg border bg-card"
              >
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`witnesses.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.witnesses.fields.name}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`witnesses.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.witnesses.fields.date}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`witnesses.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.witnesses.fields.address}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`witnesses.${index}.note`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.witnesses.fields.note}</FormLabel>
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
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col sm:flex-row justify-between w-full gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-fit"
              onClick={() => {
                appendWitness({
                  name: "",
                  address: "",
                  note: "",
                  date: new Date().toISOString().split("T")[0],
                });
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add More
            </Button>
            <Button type="button" onClick={onSave} className="w-full sm:w-fit">
              {messages.form.buttons.save}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
