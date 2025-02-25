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

interface BankDetailComponentProps {
  form: UseFormReturn<FormSchemaType>;
}

export function BankDetailComponent({ form }: BankDetailComponentProps) {

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Bank Account Information Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Bank Account Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter bank account details for the transaction
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
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter account number"
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
                  Account Holder
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter account holder name"
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
                  Bank
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter bank name"
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
                  Branch
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter branch name"
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
            name="dateCreated"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  Date Created
                </FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    placeholder="mm/dd/yyyy"
                    className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                    {...field} 
                  />
                </FormControl>
                {error && isDirty && (
                  <FormMessage className="text-xs">
                    {error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  IFSC Code
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter IFSC code"
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

        {/* SWIFT Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="swiftCode"
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <FormItem>
                <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                  SWIFT Code
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter SWIFT code"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Bank Details Document
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 ">
                    <Input 
                      type="file" 
                      className="h-12 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
