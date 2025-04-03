import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { FormSchemaType } from "@/types/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface BankDetailComponentProps {
  form: UseFormReturn<FormSchemaType>;
}

export function BankDetailComponent({ form }: BankDetailComponentProps) {
  const { messages } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Bank Account Information Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          {messages.form.sections.bank.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {messages.form.sections.bank.description}
        </p>
      </div>

      {/* Form Grid */}
      <div className="space-y-4">
        {/* Account Number and Holder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.accountNumber}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`${messages.form.sections.bank.fields.accountNumber}`}
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountHolder"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.accountHolder}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`${messages.form.sections.bank.fields.accountHolder}`}
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Bank and Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bank"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.bank}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`${messages.form.sections.bank.fields.bank}`}
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.branch}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`${messages.form.sections.bank.fields.branch}`}
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Date Created and IFSC Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.ifscCode}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`${messages.form.sections.bank.fields.ifscCode}`}
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="swiftCode"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.swiftCode}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`${messages.form.sections.bank.fields.swiftCode}`}
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>



        {/* Bank Details Document */}
        <div className="mt-4">
          <FormField
            control={form.control}
            name="bankDetailsUpload"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  {messages.form.sections.bank.fields.bankDetailsUpload}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />

                  </div>
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs text-rose-500">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
