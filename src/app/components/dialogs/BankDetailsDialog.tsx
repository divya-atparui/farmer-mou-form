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
          {messages.form.buttons.addMore}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-5 h-5" />
            {messages.form.sections.bank.title}
          </DialogTitle>
          <DialogDescription>
            {messages.form.sections.bank.description}
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>{messages.form.sections.bank.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.accountNumber}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.accountHolder}</FormLabel>
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
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.bank}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.branch}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateCreated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Created</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.ifscCode}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="swiftCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.swiftCode}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aksmvbsMembershipNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.form.sections.bank.fields.membershipNumber}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button onClick={onSave} type="submit" className="w-[120px]">{messages.form.buttons.save}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
