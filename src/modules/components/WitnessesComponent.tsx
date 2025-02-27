import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, UserCheck } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormSchemaType } from "@/types/schema";
import { useFieldArray } from "react-hook-form";

interface WitnessesComponentProps {
  form: UseFormReturn<FormSchemaType>;
}

export function WitnessesComponent({ form }: WitnessesComponentProps) {
  const { messages } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "witnesses",
  });

  const addNewWitness = () => {
    append({
      name: "",
      address: "",
      note: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Witnesses Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <UserCheck className="h-4 w-4" />
          {messages.form.sections.witnesses.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {messages.form.sections.witnesses.description}
        </p>
      </div>

      {/* Add Witness Button */}
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={addNewWitness}
        >
          <Plus className="h-3.5 w-3.5" />
          {messages.form.sections.witnesses.addWitness}
        </Button>
      </div>

      {/* Witnesses List */}
      {fields.length > 0 && (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-white/80">
              {/* Witness Header with Remove Button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">
                  {messages.form.sections.witnesses.witnessTitle} {index + 1}
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

              {/* Witness Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`witnesses.${index}.name`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.witnesses.fields.name}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.witnesses.fields.name}`}
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
                  name={`witnesses.${index}.date`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.witnesses.fields.date}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
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
                  name={`witnesses.${index}.address`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.witnesses.fields.address}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.witnesses.fields.address}`}
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
                  name={`witnesses.${index}.note`}
                  render={({ field, fieldState: { error, invalid, isDirty } }) => (
                    <FormItem>
                      <FormLabel className={`text-sm font-medium ${invalid && isDirty ? 'text-rose-500' : ''}`}>
                        {messages.form.sections.witnesses.fields.note}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`${messages.form.sections.witnesses.fields.note}`}
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

export default WitnessesComponent;