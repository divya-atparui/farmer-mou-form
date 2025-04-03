"use server";

import { cookies } from "next/headers";
import { client } from "../common/client";
import { revalidatePath } from 'next/cache';

export const postLandDetails = async (formData: FormData) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await client.post("/land-details", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  
  return data;
};


export const deleteLandDetails = async (id: string) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await client.delete(`/land-details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  // Revalidate paths to update UI after deletion
  revalidatePath('/land-details', 'layout');
  revalidatePath('/', 'layout');
  
  return response.data;
};

export const deleteWitness = async (id: string) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await client.delete(`/witness/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProperty = async (id: string) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await client.delete(`/property/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteLandOwner = async (id: string) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await client.delete(`/landowner/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
