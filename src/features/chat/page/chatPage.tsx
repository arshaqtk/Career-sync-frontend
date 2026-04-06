import { getSocket } from "@/lib/socket"
import ChatLayout from "../components/chatLayout"
import { useEffect, useState } from "react";
import { MessageSquare, WifiOff, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export default function ChatPage() {
  const socket = getSocket();
  const [connected, setConnected] = useState(socket.connected)
  const [connectionFailed, setConnectionFailed] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    // Set a timeout — if not connected in 8s, show the failed state
    const failTimeout = setTimeout(() => {
      if (!socket.connected) {
        setConnectionFailed(true)
      }
    }, 8000)

    socket.on("connect", () => {
      setConnected(true)
      setConnectionFailed(false)
      setIsRetrying(false)
      clearTimeout(failTimeout)
    })

    socket.on("disconnect", () => {
      setConnected(false)
    })

    socket.on("connect_error", () => {
      setConnectionFailed(true)
      setIsRetrying(false)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
      clearTimeout(failTimeout)
    }
  }, [socket])

  const handleRetry = () => {
    setConnectionFailed(false)
    setIsRetrying(true)
    socket.connect()

    // If still not connected after 8s, show failed again
    setTimeout(() => {
      if (!socket.connected) {
        setConnectionFailed(true)
        setIsRetrying(false)
      }
    }, 8000)
  }

  const handleReload = () => {
    window.location.reload()
  }

  // ── Connecting State ──────────────────────────────────────────────
  if (!connected && !connectionFailed) {
    return (
      <div className="h-[calc(100dvh-64px)] flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="max-w-sm w-full mx-4 bg-card rounded-3xl shadow-2xl shadow-primary/10 border border-border p-10 flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in duration-500">
          {/* Animated Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-xl">
              <MessageSquare className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 shadow-lg border border-border">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-foreground tracking-tight">
              {isRetrying ? "Reconnecting…" : "Connecting"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              {isRetrying
                ? "Attempting to re-establish your secure connection. Please wait."
                : "Establishing a secure connection to the messaging server…"}
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-primary/40 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Connection Failed State ───────────────────────────────────────
  if (connectionFailed && !connected) {
    return (
      <div className="h-[calc(100dvh-64px)] flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="max-w-sm w-full mx-4 bg-card rounded-3xl shadow-2xl shadow-destructive/10 border border-border p-10 flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in duration-500">
          {/* Error Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center">
              <WifiOff className="h-10 w-10 text-destructive" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-foreground tracking-tight">
              Connection Lost
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              We couldn't reach the chat server. This could be due to a network interruption.
            </p>
          </div>

          {/* Possible reasons */}
          <div className="w-full bg-muted/50 rounded-2xl p-5 text-left space-y-3 border border-border/50">
            <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Network Troubleshooting</p>
            {["Unstable internet connection", "Server maintenance in progress", "Firewall restriction"].map((reason, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 shrink-0" />
                <span className="text-xs font-bold">{reason}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={handleRetry}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-2xl gap-3 shadow-lg shadow-primary/20 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Try Reconnecting
            </Button>
            <Button
              onClick={handleReload}
              variant="outline"
              className="w-full font-bold h-12 rounded-2xl border-border text-muted-foreground hover:bg-muted/80 gap-3 transition-all"
            >
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <ChatLayout />
}
