"use server";

import { cookies } from "next/headers";
import { client } from "../common/client";
import { revalidatePath } from "next/cache";
import axios from "axios";

export const CreateUser = async ({
  email,
  password,
  fullName,
  phoneNumber,
  otp,
}: RegisterVariables) => {
  const data = await client({
    url: "/auth/verify-and-signup",
    method: "POST",
    data: {
      email,
      password,
      fullName,
      phoneNumber,
      otp,
    },
  }).then((response) => response.data);

  // Revalidate paths after user creation
  revalidatePath("/", "layout");
  revalidatePath("/land-details", "layout");

  return data;
};

export const getAuthToken = async ({ email, password }: LoginVariables) => {
  const data = await client({
    url: "/auth/login",
    method: "POST",
    data: {
      email,
      password,
    },
  }).then((response) => response.data);

  // Revalidate paths after login
  revalidatePath("/", "layout");
  revalidatePath("/land-details", "layout");

  return data;
};

export const getUserDetails = async () => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const data = await client({
      url: "/users/me",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const triggerOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
  try {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const data = await client({
      url: `/api/sms/send-otp?phoneNumber=${encodedPhoneNumber}`,
      method: "POST",
    }).then((response) => response.data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};
