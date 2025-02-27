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
import { FormSchemaType } from "@/types/schema";
import { useFieldArray } from "react-hook-form";

interface PropertyDetailsComponentProps {
  form: UseFormReturn<FormSchemaType>;
}

export function PropertyDetailsComponent({ form }: PropertyDetailsComponentProps) {
  const { messages } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "propertyDetails",
  });

  const addNewProperty = () => {
    append({
      itemName: "",
      cropDetails: "",
      totalArea: 0,
      surveyNumbers: "",
      location: "",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Property Details Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          {messages.form.sections.property.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {messages.form.sections.property.description}
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
          {messages.form.sections.property.fields.addProperty}
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
                  {messages.form.sections.property.fields.propertyTitle} {index + 1}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => remove(index)}
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
                        {messages.form.sections.property.fields.itemName}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.property.fields.itemName}`}
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
                        {messages.form.sections.property.fields.cropDetails}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.property.fields.cropDetails}`}
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
                        {messages.form.sections.property.fields.totalArea}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder={`${messages.form.sections.property.fields.totalArea}`}
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
                        {messages.form.sections.property.fields.surveyNumbers}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.property.fields.surveyNumbers}`}
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
                        {messages.form.sections.property.fields.location}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.property.fields.location}`}
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

export default PropertyDetailsComponent;