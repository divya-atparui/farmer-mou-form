// curl -X 'GET' \
//   'https://aurigraphfarmers-api.atparui.com/apisetu/auth-and-getDocs?code=test&state=teste&mobile=test&codeVerifier=teset' \
//   -H 'accept: */*'
"use server";
import { cookies } from "next/headers";
import { client } from "../common/client";
import axios from "axios";

export const authAndGetDocs = async (
  code: string,
  state: string,
  mobile: string,
  codeVerifier: string
) => {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const response = await client.get(
      `/apisetu/auth-and-getDocs?code=${code}&state=${state}&mobile=${mobile}&codeVerifier=${codeVerifier}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};
