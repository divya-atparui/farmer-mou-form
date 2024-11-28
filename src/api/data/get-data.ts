"use server";

import { client } from "../common/client";
import { cookies } from "next/headers";

export const getUserLandDetails = async ({ userId }: { userId: string }) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }

  const data = await client({
    url: `/data/getLandDetails/${userId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
  return data;
};
