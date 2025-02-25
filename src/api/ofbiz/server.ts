"use server"

import { cookies } from "next/headers";
import {  ofbizClient } from "../common/client";
import axios from "axios";


interface ProductLandOfbizVariables {
    productId: string;
    internalName: string;
    longDescription: string;
}

export const createLandProductDetails = async (values: ProductLandOfbizVariables) => {
    const token = cookies().get("authToken")?.value;
    if (!token) {
        throw new Error("No authentication token found");
    }
 try {
    // const data = await ofbizClient({
    //     url: "/createAtparProductByEvents",
    //     method: "POST",
    //     data: {
    //         productId: values.productId,
    //         productTypeId : values.productTypeId,
    //         internalName : values.internalName,
    //         longDescription: values.longDescription,
    //         primaryProductCategoryId : values.primaryProductCategoryId
    //     },
    //     headers: {
    //         "Content-Type": "application/json",
    //         // Authorization: `Bearer ${token}`,
    //         "X-PrivateTenant" : "default"
    //     },
    // }).then((response) => response.data);

    // return data;

    const response =await ofbizClient({
      url: "/createAtparProductByEvents",
      method: "POST",
      data: {
        productId: values.productId,
        productTypeId: "GOOD",
        internalName: values.internalName,
        longDescription: values.longDescription,
        primaryProductCategoryId: "acm"
      },
      headers: {
        "Content-Type": "application/json",
        "X-PrivateTenant": "default"
      }
    })

    // const response = await axios({
    //     method: 'POST',
    //     url: process.env.NEXT_PUBLIC_OFBIZ_API_URL + '/createAtparProductByEvents',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-PrivateTenant': 'default'
    //     },
    //     data: {
    //         productId: values.productId,
    //         productTypeId: "GOOD",
    //         internalName: values.internalName,
    //         longDescription: values.longDescription,
    //         primaryProductCategoryId: "acm"
    //     }
    // });

    return response.data;
 } catch (error) {
   if (axios.isAxiosError(error)) {
     console.error("Error creating land product:", error.response?.data);
     throw error;
   } else {
     console.error("Unknown error:", error);
     throw error;
   }
 }
}
