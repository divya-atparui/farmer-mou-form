import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { CreateUser } from "./auth";

type Variables = RegisterVariables;
type Response = RegisterResponse;

export const usePostRegister = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await CreateUser(variables);
    return data;
  },
});
