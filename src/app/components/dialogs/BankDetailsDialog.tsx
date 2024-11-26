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
import { Building2, CreditCard } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface BankDetailsDialogProps {
  form: UseFormReturn<any>;
}

export function BankDetailsDialog({ form }: BankDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const { messages } = useLanguage();

  const onSave = async () => {
    const bankFields = [
      "accountNumber",
      "accountHolder",
      "bank",
      "branch",
      "dateCreated",
      "ifscCode",
      "swiftCode",
      "aksmvbsMembershipNumber",
    ];

    const result = await form.trigger(bankFields);
    
    if (result) {
      toast.success("Bank details saved successfully!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-full">
          <CreditCard className="w-4 h-4" />
          {messages.form.buttons.save}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-[calc(100vw-2rem)] overflow-y-auto max-h-[calc(100vh-2rem)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            {messages.form.sections.bank.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {messages.form.sections.bank.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 -mx-6">
          <div className="px-6 py-4 border-b">
            <div className="text-base sm:text-lg font-semibold">{messages.form.sections.bank.title}</div>
          </div>
          <div className="px-6 grid gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.accountNumber}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.accountHolder}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.bank}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.branch}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateCreated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Date Created</FormLabel>
                    <FormControl>
                      <Input type="date" className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.ifscCode}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="swiftCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.swiftCode}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aksmvbsMembershipNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{messages.form.sections.bank.fields.membershipNumber}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onSave} type="submit" className="w-full sm:w-[120px]">{messages.form.buttons.save}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
