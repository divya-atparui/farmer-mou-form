import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";

import { postLandDetails } from "./form";


type Variables = {
  formData: FormData
}
type Response = LandDetailsResponse;

export const usePostLandDetails = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
  
    const data = await postLandDetails(variables.formData);
    return data;
  },
});

  