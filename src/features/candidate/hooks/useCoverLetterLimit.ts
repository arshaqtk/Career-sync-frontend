import { useState } from "react";
import { logger } from "@/lib/logger";

interface LimitState {
  remaining: number;       // how many left today
  total: number;           // max allowed (5)
  resetTime: Date | null;  // when it resets
  isLimited: boolean;      // true if 0 remaining
}

export const useCoverLetterLimit = () => {
  const [limitState, setLimitState] = useState<LimitState>(() => {
    const stored = localStorage.getItem("coverLetterLimit");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if reset time has passed
        if (parsed.resetTime && new Date(parsed.resetTime) < new Date()) {
          localStorage.removeItem("coverLetterLimit");
        } else {
          return parsed;
        }
      } catch (e) {
        logger.error("Error parsing coverLetterLimit from localStorage", e);
        localStorage.removeItem("coverLetterLimit");
      }
    }
    return {
      remaining: 5,
      total: 5,
      resetTime: null,
      isLimited: false
    };
  });

  const updateFromHeaders = (headers: Headers) => {
    const remaining = parseInt(headers.get("Ratelimit-Remaining") || "0");
    const total = parseInt(headers.get("Ratelimit-Limit") || "0");
    const resetUnix = parseInt(headers.get("Ratelimit-Reset") || "0");
    const resetTime = resetUnix ? new Date(resetUnix * 1000) : null;
    const newState = { remaining, total, resetTime, isLimited: remaining <= 0 };
    setLimitState(newState);
    localStorage.setItem("coverLetterLimit", JSON.stringify(newState));
  };

  const markAsLimited = (resetTime?: Date) => {
    const newState = {
      remaining: 0,
      total: 5,
      resetTime: resetTime || null,
      isLimited: true,
    };
    setLimitState(newState);
    localStorage.setItem("coverLetterLimit", JSON.stringify(newState));
  };

  return { limitState, updateFromHeaders, markAsLimited };
};
