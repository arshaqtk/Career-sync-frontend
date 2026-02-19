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
      <div className="h-[calc(100dvh-64px)] flex items-center justify-center bg-slate-50/50">
        <div className="max-w-sm w-full mx-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-10 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-500">
          {/* Animated Icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
              <MessageSquare className="h-9 w-9 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-slate-100">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              {isRetrying ? "Reconnecting…" : "Connecting to Chat"}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {isRetrying
                ? "Attempting to re-establish your connection. Please wait a moment."
                : "Establishing a secure connection to the messaging server…"}
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
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
      <div className="h-[calc(100dvh-64px)] flex items-center justify-center bg-slate-50/50">
        <div className="max-w-sm w-full mx-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-10 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-500">
          {/* Error Icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-red-50 border-2 border-red-100 flex items-center justify-center">
              <WifiOff className="h-9 w-9 text-red-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              Connection Failed
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We couldn't connect to the chat server. This may be a temporary issue — please try again or reload the page.
            </p>
          </div>

          {/* Possible reasons */}
          <div className="w-full bg-slate-50 rounded-xl p-4 text-left space-y-2 border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Possible reasons</p>
            {["Slow or unstable internet connection", "Server is temporarily unavailable", "Firewall or VPN blocking the connection"].map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-500">
                <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span className="text-xs">{reason}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={handleRetry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-xl gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              onClick={handleReload}
              variant="outline"
              className="w-full font-semibold h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
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
