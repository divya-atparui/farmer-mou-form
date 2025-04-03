import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const ofbizClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OFBIZ_API_URL + "/rest/services",

});

