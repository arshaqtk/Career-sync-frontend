import { useLocation } from "react-router-dom";
import { hash } from "zod";


export const useCurrentUrl=()=>{
    const location=useLocation()
    
    return (
    window.location.origin+location.pathname+
    location.search+location+hash)
}