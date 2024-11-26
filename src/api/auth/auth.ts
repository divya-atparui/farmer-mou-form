"use server";

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