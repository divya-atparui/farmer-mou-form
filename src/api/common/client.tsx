import axios from "axios";

export const client = axios.create({
  baseURL: "http://192.168.0.102:8005"
  // baseURL: "https://aurigraphfarmers-api.atparui.com",
});


export const ofbizClient = axios.create({
  // baseURL: "https://fv3.finverse3.com/rest/services",
  baseURL: "http://192.168.0.102:8009/rest/services"
  // baseURL: "https://aurigraphfarmers-api.atparui.com",
});

