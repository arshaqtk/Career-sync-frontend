import {Navigate}  from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import type { JSX } from "react"


export default function ProtectedRoute({children}:{children:JSX.Element}){
    const isAuthenticated=useAuthStore((s)=>s.isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    return children;
}