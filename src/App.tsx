import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from 'sonner';
// import { ToastContainer } from 'sonner';
const queryClient=new QueryClient();

function App() {



  return (
 <QueryClientProvider client={queryClient}>
  <Toaster  position='top-right'/>
  {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        newestOnTop={true}
        pauseOnFocusLoss={false}
      /> */}
  <RouterProvider router={router}/>
  <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right"/>
  </QueryClientProvider>
   
  ) 
}

export default App
