import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Textarea } from "@/components/ui/textarea";
import { UpdatedFormSchemaType } from "@/types/schema";
import { useFieldArray } from "react-hook-form";

/**
 * Updated version of LandOwnersComponent that works with UpdatedFormSchemaType
 * This component is identical to the original except for the type definition
 */
interface UpdatedLandOwnersComponentProps {
  form: UseFormReturn<UpdatedFormSchemaType>;
  landOwnerIds?: Record<number, string>; // Map of index to ID
}

export function UpdatedLandOwnersComponent({ form, landOwnerIds = {} }: UpdatedLandOwnersComponentProps) {
  const { messages } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "landOwners",
  });

  // Add new landowner
  const addNewLandOwner = () => {
    append({
      id: null,
      landownerName: "",
      aadhaar: "",
      aadhaarFile: null,
      landDeedFile: null,
      address: "",
      email: "",
      mobile: "",
    });
  };

  // Remove landowner (simplified version without API call)
  const handleRemove = (index: number) => {
    // In this simplified version, we just remove the item locally
    remove(index);
    
    // Log the action (in a real implementation, this would be an API call)
    const id = landOwnerIds[index];
    if (id) {
      console.log(`Would delete landowner with ID: ${id}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            {messages.form?.sections?.landowners?.title || "Land Owners"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {messages.form?.sections?.landowners?.description || "Add details of land owners"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addNewLandOwner}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {messages.form?.sections?.landowners?.addLandowner || "Add Landowner"}
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {messages.form?.sections?.landowners?.noLandowners || "No landowners added yet"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {messages.form?.sections?.landowners?.addLandownerDescription || "Add landowners to continue"}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={addNewLandOwner}
            className="mt-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            {messages.form?.sections?.landowners?.addLandowner || "Add Landowner"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`landOwners.${index}.landownerName`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.name || "Name"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form?.sections?.landowners?.fields?.name || "Enter name"}
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
                  name={`landOwners.${index}.aadhaar`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.aadhar || "Aadhaar"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form?.sections?.landowners?.fields?.aadhar || "Enter Aadhaar number"}
                          maxLength={12}
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
                  name={`landOwners.${index}.email`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.email || "Email"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder={messages.form?.sections?.landowners?.fields?.email || "Enter email"}
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
                  name={`landOwners.${index}.mobile`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.mobile || "Mobile"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          maxLength={10}
                          placeholder={messages.form?.sections?.landowners?.fields?.mobile || "Enter mobile number"}
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
                  name={`landOwners.${index}.address`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem className="col-span-full">
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.address || "Address"}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={messages.form?.sections?.landowners?.fields?.address || "Enter address"}
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
                  name={`landOwners.${index}.aadhaarFile`}
                  render={({ field: { onChange, value, ...field }, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.aadhaarDocument || "Aadhaar Document"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
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
                  name={`landOwners.${index}.landDeedFile`}
                  render={({ field: { onChange, value, ...field }, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.landowners?.fields?.landDeedDocument || "Land Deed Document"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpdatedLandOwnersComponent; 