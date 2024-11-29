"use server";

import { cookies } from "next/headers";
import { client } from "../common/client";

export const CreateUser = async ({
  email,
  password,
  fullName,
}: RegisterVariables) => {
  const data = await client({
    url : "/auth/signup",
    method: "POST",
    data: {

      email,
      password,
      fullName,
    },
  }).then((response) => response.data);
  return data;
};



export const getAuthToken = async ({email,password}:LoginVariables) => {
    const data = await client({
        url : "/auth/login",
        method: "POST",
        data: {
          email,
          password,
        },
    }).then((response) => response.data);
    return data;
}

export const getUserDetails = async () => {
  const token =  cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const data = await client({
    url: "/users/me",
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': '*/*'
    }
  }).then((response) => response.data);
  return data;
};