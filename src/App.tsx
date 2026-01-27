import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import AppRouter from "./routes/AppRouter";
import { registerSocketListeners } from "./lib/socket";
import { SocketProvider } from "./providers/SocketProvider";
import { ErrorBoundary } from "./components/errors/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  registerSocketListeners()
  return (
    <QueryClientProvider client={queryClient}>
       <ErrorBoundary>
      <SocketProvider />
      <Toaster position="top-right" />
      <AppRouter />
</ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
