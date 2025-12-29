import { handleRQError } from "@/lib/react-query/errorHandler";
import { QueryCache, QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient=new QueryClient({
    queryCache: new QueryCache({
    onError: (error) => {
        alert("called")
      handleRQError(error)
    },
  }),
    defaultOptions:{
        queries:{
            retry: false,
            staleTime:1000*60,
            refetchOnWindowFocus:false
        },
         mutations: {
      onError: handleRQError,
    },
    }
});


export const QueryProvider:React.FC<{children:React.ReactNode}>=({children})=>(
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false}/>       
    </QueryClientProvider>)