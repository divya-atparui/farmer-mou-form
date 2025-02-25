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
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            {messages.form.sections.property.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {messages.form.sections.property.description}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addNewProperty}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No Properties</h3>
          <p className="mt-1 text-sm text-gray-500">Add a property to get started</p>
          <Button
            type="button"
            variant="outline"
            onClick={addNewProperty}
            className="mt-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Property
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
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

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
                          placeholder="Enter item name"
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
                          placeholder="Enter crop details"
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
                          placeholder="Enter total area"
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
                          placeholder="Enter survey numbers"
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
                          placeholder="Enter location"
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