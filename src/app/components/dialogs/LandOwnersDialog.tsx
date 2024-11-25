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
import { Plus, Trash2, Users, UserPlus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface LandOwnersDialogProps {
  form: UseFormReturn<any>;
  landOwnerFields: any[];
  appendLandOwner: (value: any) => void;
  removeLandOwner: (index: number) => void;
}

export function LandOwnersDialog({
  form,
  landOwnerFields,
  appendLandOwner,
  removeLandOwner,
}: LandOwnersDialogProps) {
  const [open, setOpen] = useState(false);
  const { messages } = useLanguage();

  const onSave = async () => {
    const validationPromises = landOwnerFields.map((_, index) => {
      const fields = [
        `landOwners.${index}.landownerName`,
        `landOwners.${index}.aadhar`,
        `landOwners.${index}.mobile`,
        `landOwners.${index}.email`,
      ];
      return form.trigger(fields);
    });

    const results = await Promise.all(validationPromises);
    const isValid = results.every(result => result === true);

    if (isValid) {
      toast.success("Land owners details saved successfully!");
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
          <Users className="w-4 h-4" />
          {messages.form.buttons.addMore}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="w-6 h-6" />
            {messages.form.sections.landowners.title}
          </DialogTitle>
          <DialogDescription>
            {messages.form.sections.landowners.description}
          </DialogDescription>
        </DialogHeader>

        <Card className="max-h-[500px] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 pb-6 border-b">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Land Owners
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendLandOwner({
                  landownerName: "",
                  signature: "",
                  aadhar: "",
                  date: new Date().toISOString().split("T")[0],
                  email: "",
                  mobile: "",
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Land Owner
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {landOwnerFields.map((field, index) => (
              <div key={field.id} className="relative p-4 rounded-lg border bg-card">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`landOwners.${index}.landownerName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.landowners.fields.name}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`landOwners.${index}.signature`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Signature</FormLabel>
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
                      name={`landOwners.${index}.aadhar`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.landowners.fields.aadhar}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`landOwners.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.landowners.fields.email}</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`landOwners.${index}.mobile`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.form.sections.landowners.fields.mobile}</FormLabel>
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
                    removeLandOwner(index);
                    if (landOwnerFields.length === 1) {
                      appendLandOwner({
                        landownerName: "",
                        signature: "",
                        aadhar: "",
                        date: new Date().toISOString().split("T")[0],
                        email: "",
                        mobile: "",
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
                appendLandOwner({
                  landownerName: "",
                  aadhar: "",
                  mobile: "",
                  email: "",
                });
              }}
            >
              Add More
            </Button>
            <Button type="button" onClick={onSave} className="w-[120px]">{messages.form.buttons.save}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
