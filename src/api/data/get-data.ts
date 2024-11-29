"use server";

import { client } from "../common/client";
import { cookies } from "next/headers";

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

  console.log(
    "email: " +
      userDetail.email +
      " id: " +
      userDetail.id +
      ",I am getting user details"
  );

  const res = await client({
    url: `/land-details/by-user/${userDetail.id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
  return res.data;

  // return data;
};
