import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";

import { getAuthToken } from "./auth";
import { cookieLogin } from "./cookie";

type Variables = LoginVariables;
type Response = LoginResponse

export const usePostLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
   const data:LoginResponse = await getAuthToken(variables)
   await cookieLogin({id_token:data.token})
   return data
  },
});
