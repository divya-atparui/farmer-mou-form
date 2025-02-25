"use server";

import { cookies } from "next/headers";
import { client } from "../common/client";
import { revalidatePath } from 'next/cache';

export const postLandDetails = async (formData: FormData) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  // const data = await client({
  //   url: "/land-details",
  //   method: "POST",
  //   data: {
  //       ...variables
  //   },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then((response) => response.data);

  const response = await client.post("/land-details", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;

  // Revalidate all land details pages since we've added new data
  revalidatePath('/land-details', 'layout');
  // Revalidate the root path to update any overview or dashboard data
  revalidatePath('/', 'layout');
  
  return data;
};
