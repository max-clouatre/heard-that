import React from "react";
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }) {
    const queryClientRef = React.useRef()
   if (!queryClientRef.current) {
     queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 60 * 5000 // 1 minute
        },
      },
    })
   }

    return (
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    );
}

export default MyApp;
