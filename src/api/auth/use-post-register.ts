import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { CreateUser, triggerOtp } from "./auth";

type Variables = RegisterVariables;
type Response = RegisterResponse;

export const usePostRegister = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await CreateUser(variables);
    return data;
  },
});

export const useTriggerOtp = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const data = await triggerOtp(variables);
    return data;
  },
});