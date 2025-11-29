import { type LoginFormValues } from "@/validators/auth.schema";
import api from "./apiClient";


export const LoginApi=async (data:LoginFormValues)=>{
    const res= await api.post("/auth/login",data)
    console.log(res)
    return res.data
}