"use server";

import { client } from "../common/client";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';

export const getUserLandDetails = async () => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const userDetail: UserDetailsResponse = await client({
    url: "/users/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);

  const res = await client({
    url: `/land-details/by-user/${userDetail.id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Revalidate the land-details path to ensure fresh data
  revalidatePath('/land-details', 'layout');
  
  return res.data;
};

export const userIndividualLandDetails = async (id: string) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const data = await client({
    url: `/land-details/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);

  // Revalidate the specific land details page
  revalidatePath(`/land-details/${id}`, 'page');
  
  return data;
};
