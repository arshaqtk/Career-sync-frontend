import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import AppRouter from "./routes/AppRouter";
import { registerSocketListeners } from "./lib/socket";
import { SocketProvider } from "./providers/SocketProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ErrorBoundary } from "./components/errors/ErrorBoundary";
import { initPresenceSocket } from "./sockets/presence.socket";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket"
import { usePresenceStore } from "./features/chat/store/presence.store";
import { getOnlineUsersApi } from "./api/users.api";

import { SEO } from "./components/seo/SEO";

const queryClient = new QueryClient();

function App() {
 

useEffect(() => {
    const socket = getSocket();
    initPresenceSocket();
    registerSocketListeners();

    const loadOnlineUsers = async () => {
      
      const {users} =await getOnlineUsersApi()
      const { setOnline } = usePresenceStore.getState();
      users.forEach(setOnline);
    };

    loadOnlineUsers();

    return () => {
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <SEO />
          <SocketProvider />
          <Toaster position="top-right" />
          <AppRouter />
        </ErrorBoundary>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
