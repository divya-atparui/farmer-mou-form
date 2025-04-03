import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, UserCheck, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormSchemaType } from "@/types/schema";
import { useFieldArray } from "react-hook-form";
import { useDeleteWitness } from "@/api/form/use-land-details";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface WitnessesComponentProps {
  form: UseFormReturn<FormSchemaType>;
  witnessIds?: Record<number, string>; // Map of index to ID
}

export function WitnessesComponent({ form, witnessIds = {} }: WitnessesComponentProps) {
  const { messages } = useLanguage();
  const queryClient = useQueryClient();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "witnesses",
  });

  // Initialize the delete mutation
  const { mutate: deleteWitness, isPending: isDeleting } = useDeleteWitness();

  const addNewWitness = () => {
    append({
      id: null,
      name: "",
      address: "",
      note: "",
    });
  };

  // Enhanced remove function that calls the API if an ID exists
  const handleRemove = (index: number) => {
    const id = witnessIds[index];
    
    // If we have an ID for this witness, call the delete API
    if (id) {
      deleteWitness(
        { id },
        {
          onSuccess: (data) => {
            // Remove from the form after successful API call
            remove(index);
            if (data.status === 200) {
              toast.success(messages.form.sections.witnesses.deleteSuccess || "Witness deleted successfully");
              queryClient.invalidateQueries({ queryKey: ["userLandDetails"] });
            } else {
              toast.error(messages.form.sections.witnesses.deleteError || "Failed to delete witness");
            }
          },
          onError: (error) => {
            console.error("Error deleting witness:", error);
            toast.error(messages.form.sections.witnesses.deleteError || "Failed to delete witness");
          }
        }
      );
    } else {
      // If no ID exists (new item not yet saved), just remove from the form
      remove(index);
    }
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
                  onClick={() => handleRemove(index)}
                  disabled={isDeleting}
                >
                  {isDeleting && witnessIds[index] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  )}
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