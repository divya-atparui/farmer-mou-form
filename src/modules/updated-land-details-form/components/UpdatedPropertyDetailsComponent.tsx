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
import { Plus, Trash2, Building2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { UpdatedFormSchemaType } from "@/types/schema";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";

/**
 * Updated version of PropertyDetailsComponent that works with UpdatedFormSchemaType
 * This component is identical to the original except for the type definition
 */
interface UpdatedPropertyDetailsComponentProps {
  form: UseFormReturn<UpdatedFormSchemaType>;
  propertyIds?: Record<number, string>; // Map of index to ID
}

export function UpdatedPropertyDetailsComponent({ form, propertyIds = {} }: UpdatedPropertyDetailsComponentProps) {
  const { messages } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "propertyDetails",
  });

  // Add new property
  const addNewProperty = () => {
    append({
      id: null,
      itemName: "",
      cropDetails: "",
      totalArea: 0,
      surveyNumbers: "",
      location: "",
    });
  };

  // Remove property (simplified version without API call)
  const handleRemove = (index: number) => {
    // In this simplified version, we just remove the item locally
    remove(index);
    
    // Log the action (in a real implementation, this would be an API call)
    const id = propertyIds[index];
    if (id) {
      console.log(`Would delete property with ID: ${id}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Property Details Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          {messages.form?.sections?.property?.title || "Property Details"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {messages.form?.sections?.property?.description || "Add details about the property"}
        </p>
      </div>

      {/* Add Property Button */}
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={addNewProperty}
        >
          <Plus className="h-3.5 w-3.5" />
          {messages.form?.sections?.property?.fields?.addProperty || "Add Property"}
        </Button>
      </div>

      {/* Property List */}
      {fields.length > 0 && (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-white/80">
              {/* Property Header with Remove Button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">
                  {messages.form?.sections?.property?.fields?.propertyTitle || "Property"} {index + 1}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleRemove(index)}
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>

              {/* Property Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`propertyDetails.${index}.itemName`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.property?.fields?.itemName || "Item Name"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form?.sections?.property?.fields?.itemName || "Enter item name"}
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
                  name={`propertyDetails.${index}.cropDetails`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.property?.fields?.cropDetails || "Crop Details"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form?.sections?.property?.fields?.cropDetails || "Enter crop details"}
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
                  name={`propertyDetails.${index}.totalArea`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.property?.fields?.totalArea || "Total Area"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder={messages.form?.sections?.property?.fields?.totalArea || "Enter total area"}
                          className={`text-sm ${invalid && isDirty ? 'border-rose-500' : ''}`} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          value={field.value}
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
                  name={`propertyDetails.${index}.surveyNumbers`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.property?.fields?.surveyNumbers || "Survey Numbers"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form?.sections?.property?.fields?.surveyNumbers || "Enter survey numbers"}
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
                  name={`propertyDetails.${index}.location`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form?.sections?.property?.fields?.location || "Location"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={messages.form?.sections?.property?.fields?.location || "Enter location"}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpdatedPropertyDetailsComponent; 