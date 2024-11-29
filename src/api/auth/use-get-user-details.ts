import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { getUserDetails } from './auth';



type Response = UserDetailsResponse;
type Variables = void;

export const useGetUserDetails = createQuery<Response, Variables, AxiosError>({
  queryKey: ['userDetails'],
  fetcher: async () => {
    const data  = await getUserDetails();
    return data;
  },
});
