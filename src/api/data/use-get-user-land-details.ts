import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { getUserLandDetails } from './get-data';



// type Response = {};
type Variables = void;

export const useGetUserLandDetails = createQuery<Response, Variables, AxiosError>({
  queryKey: [''],
  fetcher: () => {
    const data = getUserLandDetails({ userId: "" });
    return data;
  },
});
