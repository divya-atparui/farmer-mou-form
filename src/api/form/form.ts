"use server";

import { cookies } from "next/headers";
import { client } from "../common/client";

export const postLandDetails = async (variables: LandDetailsVariables) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const data = await client({
    url: "/land-details",
    method: "POST",
    data: {
        ...variables
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
  return data;
};
