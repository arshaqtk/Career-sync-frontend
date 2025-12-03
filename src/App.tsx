
// import { useEffect } from 'react';
import './App.css'
// import { useAuthStore } from './store/auth.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from 'react-toastify';
const queryClient=new QueryClient();

function App() {



  return (
 <QueryClientProvider client={queryClient}>
  <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        newestOnTop={true}
        pauseOnFocusLoss={false}
      />
  <RouterProvider router={router}/>
  <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right"/>
  </QueryClientProvider>
   
  ) 
}

export default App
