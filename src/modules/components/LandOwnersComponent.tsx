/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Users, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Textarea } from "@/components/ui/textarea";
import { FormSchemaType, UpdatedFormSchemaType } from "@/types/schema";
import { useFieldArray } from "react-hook-form";
import { useDeleteLandOwner } from "@/api/form/use-land-details";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
interface LandOwnersComponentProps {
  form: UseFormReturn<FormSchemaType | UpdatedFormSchemaType>;
  landOwnerIds?: Record<number, string>; // Map of index to ID
}

export function LandOwnersComponent({ form, landOwnerIds = {} }: LandOwnersComponentProps) {
  const { messages } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "landOwners",
  });
  const queryClient = useQueryClient();

  // Initialize the delete mutation
  const { mutate: deleteLandOwner, isPending: isDeleting } = useDeleteLandOwner();

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

  // Enhanced remove function that calls the API if an ID exists
  const handleRemove = (index: number) => {
    const id = landOwnerIds[index];
    
    // If we have an ID for this landowner, call the delete API
    if (id) {
      deleteLandOwner(
        { id },
        {
          onSuccess: (data) => {

            // Remove from the form after successful API call
            remove(index);
            if (data.status === 200) {
              toast.success(messages.form.sections.landowners.deleteSuccess || "Land owner deleted successfully");
              queryClient.invalidateQueries({ queryKey: ["userLandDetails"] });
            } else {
              toast.error(messages.form.sections.landowners.deleteError || "Failed to delete land owner");
            }
          },
          onError: (error) => {
            console.error("Error deleting land owner:", error);
            toast.error(messages.form.sections.landowners.deleteError || "Failed to delete land owner");
          }
        }
      );
    } else {
      // If no ID exists (new item not yet saved), just remove from the form
      remove(index);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 pt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            {messages.form.sections.landowners.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {messages.form.sections.landowners.description}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addNewLandOwner}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {messages.form.sections.landowners.addLandowner}
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {messages.form.sections.landowners.noLandowners}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {messages.form.sections.landowners.addLandownerDescription}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={addNewLandOwner}
            className="mt-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            {messages.form.sections.landowners.addLandowner}
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
                disabled={isDeleting}
              >
                {isDeleting && landOwnerIds[index] ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`landOwners.${index}.landownerName`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.landowners.fields.name}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form.sections.landowners.fields.name}
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
                        {messages.form.sections.landowners.fields.aadhar}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form.sections.landowners.fields.aadhar}
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
                        {messages.form.sections.landowners.fields.email}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder={messages.form.sections.landowners.fields.email}
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
                        {messages.form.sections.landowners.fields.mobile}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          maxLength={10}
                          placeholder={messages.form.sections.landowners.fields.mobile}
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
                        {messages.form.sections.landowners.fields.address}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={messages.form.sections.landowners.fields.address}
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
                  render={({ field: { onChange,value, ...field }, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.landowners.fields.aadhaarDocument}
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
                  render={({ field: { onChange,value, ...field }, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.landowners.fields.landDeedDocument}
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

export default LandOwnersComponent