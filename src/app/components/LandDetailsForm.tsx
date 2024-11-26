/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../types/schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { BankDetailsDialog } from "./dialogs/BankDetailsDialog";
import { LandOwnersDialog } from "./dialogs/LandOwnersDialog";
import { PropertyDetailsDialog } from "./dialogs/PropertyDetailsDialog";
import { WitnessesDialog } from "./dialogs/WitnessesDialog";
import { z } from "zod";
import { MOUPreview } from "./MOUPreview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";

import { useLanguage } from "@/contexts/LanguageContext";
import { usePostLandDetails } from "@/api/form/use-post-land-details";
import JsonDataView from "./JsonDataView";
import JsonDataKannadaView from "./JsonDataKannadaView";

// Define the type from the schema
export type FormData = z.infer<typeof formSchema>;

export default function LandDetailsForm() {
  const { messages } = useLanguage();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      accountHolder: "",
      bank: "",
      branch: "",
      dateCreated: "",
      ifscCode: "",
      swiftCode: "",
      aksmvbsMembershipNumber: "",
      landOwners: [],
      propertyDetails: [],
      witnesses: [],
    },
  });

  const {
    fields: landOwnerFields,
    append: appendLandOwner,
    remove: removeLandOwner,
  } = useFieldArray({
    control: form.control,
    name: "landOwners",
  });

  const {
    fields: propertyFields,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control: form.control,
    name: "propertyDetails",
  });

  const {
    fields: witnessFields,
    append: appendWitness,
    remove: removeWitness,
  } = useFieldArray({
    control: form.control,
    name: "witnesses",
  });

  const { mutate: postLandDetails, isPending } = usePostLandDetails();

  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [jsonData, setJsonData] = useState<LandDetailsResponse | null>(null);

  function onSubmit(data: FormData) {
    postLandDetails(
      {
        accountNumber: data.accountNumber,
        accountHolder: data.accountHolder,
        bank: data.bank,
        branch: data.branch,
        dateCreated: data.dateCreated,
        ifscCode: data.ifscCode,
        swiftCode: data.swiftCode,
        aksmvbsMembershipNumber: data.aksmvbsMembershipNumber,
        landOwners: data.landOwners,
        propertyDetails: data.propertyDetails,
        witnesses: data.witnesses,
      },
      {
        onSuccess: (data) => {
          setJsonData(data);
          setShowJsonPreview(true);
          toast.success("Form submitted successfully!");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Please Try Again" + error.message);
        },
      }
    );
  }

  // Calculate form completion progress
  const formData = form.watch();
  const getProgress = () => {
    let progress = 0;

    // Check bank details - require both account number and bank name
    if (formData.accountNumber && formData.bank) progress += 25;

    // Check landowners - at least one landowner with required fields
    const hasValidLandowner = formData.landOwners?.some(
      (owner) => owner.landownerName && owner.aadhar && owner.mobile
    );
    if (hasValidLandowner) progress += 25;

    // Check properties - at least one property with required fields
    const hasValidProperty = formData.propertyDetails?.some(
      (property) => property.itemName && property.totalArea && property.location
    );
    if (hasValidProperty) progress += 25;

    // Check witnesses - at least one witness with required fields
    const hasValidWitness = formData.witnesses?.some(
      (witness) => witness.name && witness.address
    );
    if (hasValidWitness) progress += 25;

    return progress;
  };

  // Helper function to check section completion for badges
  const isSectionComplete = (section: string) => {
    switch (section) {
      case "bank":
        return !!(formData.accountNumber && formData.bank);
      case "landowners":
        return formData.landOwners?.some(
          (owner) => owner.landownerName && owner.aadhar && owner.mobile
        );
      case "properties":
        return formData.propertyDetails?.some(
          (property) =>
            property.itemName && property.totalArea && property.location
        );
      case "witnesses":
        return formData.witnesses?.some(
          (witness) => witness.name && witness.address
        );
      default:
        return false;
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("mou-content");
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore all event listeners
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4">
          {/* Progress Card */}
          <Card className="flex-none">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">
                    {messages.form.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {messages.form.description}
                  </p>
                </div>
                <LanguageToggle />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    Land Registration Form
                  </CardTitle>
                  <CardDescription>
                    Fill in the details to generate your MOU document
                  </CardDescription>
                </div>
                <Badge variant="outline" className="h-8">
                  {getProgress()}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={getProgress()} className="mb-4" />
              <div className="space-y-1 text-sm mb-2">
                <p className="text-muted-foreground">Complete all sections:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Badge
                    variant={isSectionComplete("bank") ? "default" : "outline"}
                    className="text-xs sm:text-sm"
                  >
                    Bank Details
                  </Badge>
                  <Badge
                    variant={
                      isSectionComplete("landowners") ? "default" : "outline"
                    }
                    className="text-xs sm:text-sm"
                  >
                    Landowners
                  </Badge>
                  <Badge
                    variant={
                      isSectionComplete("properties") ? "default" : "outline"
                    }
                    className="text-xs sm:text-sm"
                  >
                    Properties
                  </Badge>
                  <Badge
                    variant={
                      isSectionComplete("witnesses") ? "default" : "outline"
                    }
                    className="text-xs sm:text-sm"
                  >
                    Witnesses
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Content Card */}
          <Card className="flex-1">
            <CardContent className="p-4 sm:p-6">
              <ScrollArea className="">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">
                          {messages.form.sections.bank.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {messages.form.sections.bank.description}
                        </p>
                        <BankDetailsDialog form={form} />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">
                          {messages.form.sections.landowners.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {messages.form.sections.landowners.description}
                        </p>
                        <LandOwnersDialog
                          form={form}
                          landOwnerFields={landOwnerFields}
                          appendLandOwner={appendLandOwner}
                          removeLandOwner={removeLandOwner}
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">
                          {messages.form.sections.property.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {messages.form.sections.property.description}
                        </p>
                        <PropertyDetailsDialog
                          form={form}
                          propertyFields={propertyFields}
                          appendProperty={appendProperty}
                          removeProperty={removeProperty}
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">
                          {messages.form.sections.witnesses.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {messages.form.sections.witnesses.description}
                        </p>
                        <WitnessesDialog
                          form={form}
                          witnessFields={witnessFields}
                          appendWitness={appendWitness}
                          removeWitness={removeWitness}
                        />
                      </div>
                    </div>
                  </form>
                </Form>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Submit Button Card */}
          <Card className="flex-none">
            <CardContent className="p-4">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={getProgress() < 100 || isPending || jsonData !== null}
              >
                {jsonData !== null
                  ? "Completed"
                  : getProgress() < 100
                  ? "Please Complete All Sections"
                  : isPending
                  ? "Generating..."
                  : "Generate MOU Document"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section - Hidden on mobile, shown as dialog */}
        <Card className="hidden lg:block flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Document Preview</CardTitle>
                <CardDescription>
                  Real-time preview of your MOU document
                </CardDescription>
              </div>
              <Badge
                onClick={() => setShowJsonPreview(true)}
                variant="default"
                className="cursor-pointer "
              >
                Live Preview
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100vh-10rem)]">
            <MOUPreview data={form.watch()} />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Preview Button - Only shown on mobile */}
      <div className="fixed bottom-4 right-4 lg:hidden ">
        <Button
          onClick={() => setShowJsonPreview(true)}
          size="lg"
          className="rounded-full shadow-lg"
        >
          {jsonData !== null ? "View MOU" : "Preview MOU"}
        </Button>
      </div>

      {/* JSON Preview Dialog */}
      <Dialog open={showJsonPreview} onOpenChange={setShowJsonPreview}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[1200px] h-[calc(100vh-4rem)] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-xl sm:text-2xl">
              Memorandum of Understanding (MoU)
            </DialogTitle>
            <div className="flex justify-end mt-4">
              <Button
                onClick={handlePrint}
                variant="default"
                className="text-sm sm:text-base"
              >
                Print MoU
              </Button>
            </div>
          </DialogHeader>

          <div id="mou-content" className="">
            {messages.lang === "en" ? (
              <JsonDataView data={jsonData} />
            ) : (
              <JsonDataKannadaView data={jsonData} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
