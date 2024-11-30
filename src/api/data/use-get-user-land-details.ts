import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { getUserLandDetails } from './get-data';

type Response = UserLandDetailsResponse[];
type Variables = void;

export const useGetUserLandDetails = createQuery<Response, Variables, AxiosError>({
  queryKey: ['userLandDetails', 'auth'],
  fetcher: () => {
    const data = getUserLandDetails();
    return data;
  },
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: false,
});
