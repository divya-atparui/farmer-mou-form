import { z } from "zod";

export const landOwnerSchema = z.object({
  landownerName: z.string().min(1, "Landowner name is required"),
  signature: z.string().min(1, "Signature is required"),
  aadhaar: z.string().min(12, "Aadhaar must be 12 digits").max(12), // Changed from aadhar to aadhaar
  aadhaarFile: z.instanceof(File).nullable(), // New field
  landDeedFile: z.instanceof(File).nullable(), // New field
  address: z.string().min(1, "Address is required"),
  date: z.string(),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be 10 digits").max(10),
});

export const propertySchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  cropDetails: z.string().min(1, "Crop details are required"),
  totalArea: z.number().min(0, "Area must be positive"),
  surveyNumbers: z.string().min(1, "Survey numbers are required"),
  location: z.string().min(1, "Location is required"),
});

export const witnessSchema = z.object({
  name: z.string().min(1, "Witness name is required"),
  address: z.string().min(1, "Address is required"),
  note: z.string().optional(),
  date: z.string(),
});

export const formSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  accountHolder: z.string().min(1, "Account holder name is required"),
  dateCreated: z.string(),
  ifscCode: z.string().min(11, "IFSC code must be 11 characters").max(11),
  swiftCode: z.string().min(8, "SWIFT code must be 8-11 characters").max(11),
  bank: z.string().min(1, "Bank name is required"),
  branch: z.string().min(1, "Branch name is required"),
  bankDetailsUpload: z.instanceof(File).nullable(), // New field
  landOwners: z.array(landOwnerSchema).min(1, "At least one landowner is required"),
  propertyDetails: z.array(propertySchema).min(1, "At least one property is required"),
  witnesses: z.array(witnessSchema).min(1, "At least one witness is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
