
// import { useEffect } from 'react';
import './App.css'
// import { useAuthStore } from './store/auth.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';

const queryClient=new QueryClient();

function App() {

// const fetchMe = useAuthStore((s) => s.fetchMe);

  // useEffect(() => {
  //   fetchMe(); 
  // }, []);

  return (
 <QueryClientProvider client={queryClient}>
  <RouterProvider router={router}/>
  </QueryClientProvider>
   
  )
}

export default App
