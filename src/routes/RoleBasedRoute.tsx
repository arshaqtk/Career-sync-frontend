import { useAuthStore } from "@/store/auth.store";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";


export default function RoleBasedRoute({allowed,children}:{
    allowed:string[];
    children:JSX.Element
}){
    const user=useAuthStore((s)=>s.user);

    if(!user?.role||!allowed.includes(user.role)){
        return <Navigate to="/unauthorized" replace/>
    }

    return children
}