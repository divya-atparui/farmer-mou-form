import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { createLandProductDetails } from "./server";

type Variables = {
  productId: string;

  internalName: string;
  longDescription: string;
};
type Response = void;

export const useCreateLandProduct = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const data = await createLandProductDetails(variables);
    return data;
  },
});
