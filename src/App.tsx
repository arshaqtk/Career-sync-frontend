import "./App.css";
import { Toaster } from "sonner";

import AppRouter from "./routes/AppRouter";
import { registerSocketListeners } from "./lib/socket";
import { QueryProvider } from "./providers/QueryProvider";
import { SocketProvider } from "./providers/SocketProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ErrorBoundary } from "./components/errors/ErrorBoundary";
import { initPresenceSocket } from "./sockets/presence.socket";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket"
import { usePresenceStore } from "./features/chat/store/presence.store";
import { getOnlineUsersApi } from "./api/users.api";
import { Analytics } from "@vercel/analytics/react"
import { SEO } from "./components/seo/SEO";

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
    <QueryProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Analytics/>
          <SEO />
          <SocketProvider />
          <Toaster position="top-right" />
          <AppRouter />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
