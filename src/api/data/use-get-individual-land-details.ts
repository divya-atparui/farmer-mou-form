import { userIndividualLandDetails } from './get-data';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';


type Response = UserDetailsResponse;
type Variables = {
    id: string
};

export const useGetIndividualLandDetails = createQuery<Response, Variables, AxiosError>({
  queryKey: ['individualLandDetails'],
  fetcher: async (variables) => {
    const data = await userIndividualLandDetails(variables.id);
    return data;
  },
});
