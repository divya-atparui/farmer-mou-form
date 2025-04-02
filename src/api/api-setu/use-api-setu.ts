import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { authAndGetDocs } from './api-setu';

type Response = ApiSetuResponse;
type Variables = ApiSetuVariables;

export const useAuthAndGetDocs = createQuery<Response, Variables, AxiosError>({
  queryKey: ['api-setu'],
  fetcher: async (variables) => {
    const response = await authAndGetDocs(variables.code, variables.state, variables.mobile, variables.codeVerifier)
    return response
  }
})
