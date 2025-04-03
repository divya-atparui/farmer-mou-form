import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";

import {  deleteLandDetails, deleteLandOwner, deleteProperty, deleteWitness, postLandDetails } from "./form";


type Variables = {
  formData: FormData
}
type Response = LandDetailsResponse;

type DeleteVariables = {
  id: string
}

export const useLandDetails = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
  
    const data = await postLandDetails(variables.formData);
    return data;
  },
});

export const useDeleteLandDetails = createMutation<DeleteResponse, DeleteVariables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await deleteLandDetails(variables.id);
    return data;
  },
});

export const useDeleteProperty = createMutation<DeleteResponse, DeleteVariables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await deleteProperty(variables.id);
    return data;
  },
});

export const useDeleteWitness = createMutation<DeleteResponse, DeleteVariables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await deleteWitness(variables.id);
    return data;
  },
});

export const useDeleteLandOwner = createMutation<DeleteResponse, DeleteVariables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await deleteLandOwner  (variables.id);
    return data;
  },
});

