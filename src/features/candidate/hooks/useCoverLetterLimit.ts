import { useEffect, useState } from "react";

interface LimitState {
  remaining: number;       // how many left today
  total: number;           // max allowed (5)
  resetTime: Date | null;  // when it resets
  isLimited: boolean;      // true if 0 remaining
}

export const useCoverLetterLimit=()=>{
  const [limitState, setLimitState] = useState<LimitState>({
  remaining: localStorage.getItem("coverLetterLimit")?JSON.parse(localStorage.getItem("coverLetterLimit")||"{}").remaining:5,
  total: localStorage.getItem("coverLetterLimit")?JSON.parse(localStorage.getItem("coverLetterLimit")||"{}").total:5,
  resetTime: localStorage.getItem("coverLetterLimit")?JSON.parse(localStorage.getItem("coverLetterLimit")||"{}").resetTime:null,
  isLimited: localStorage.getItem("coverLetterLimit")?JSON.parse(localStorage.getItem("coverLetterLimit")||"{}").isLimited:false
});

useEffect(()=>{
const stored=localStorage.getItem("coverLetterLimit")
if(stored){
   const parsed = JSON.parse(stored);
      // Check if reset time has passed
      if (parsed.resetTime && new Date(parsed.resetTime) < new Date()) {
        // Reset has passed — clear stored limit
        localStorage.removeItem("coverLetterLimit");
      } else {
        setLimitState(parsed);
      }
}
},[])

const updateFromHeaders=(headers:Headers)=>{
    console.log(headers)
  const remaining=parseInt(headers.get("Ratelimit-Remaining")||"0")
  const total=parseInt(headers.get("Ratelimit-Limit")||"0")
  const resetUnix=parseInt(headers.get("Ratelimit-Reset")||"0")
  const resetTime=resetUnix?new Date(resetUnix*1000):null
  const newState={remaining,total,resetTime,isLimited:remaining<=0}
  console.log(newState)
    setLimitState(newState)
    localStorage.setItem("coverLetterLimit",JSON.stringify(newState))
  }

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
}

