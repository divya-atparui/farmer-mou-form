// In Next.js, this file would be called: app/providers.jsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
            refetchOnMount: false, // Don't automatically refetch on mount
            refetchOnWindowFocus: false, // Don't refetch on tab focus
            refetchOnReconnect: false, // Don't refetch on reconnect
            retry: 1,
            // Custom behavior for specific queries can be set in the useQuery hook
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
