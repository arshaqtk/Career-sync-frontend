import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyForgetPasswordOtp from "@/features/auth/pages/VerifyForgetPasswordOtp";
import {  VerifyRegisterOtp } from "@/features/auth/pages/VerifyRegisterOtp";
import EditProfilePage from "@/features/candidate/pages/editProfile";
import { CandidateProfilePage } from "@/features/candidate/pages/profile";
import DashboardPage from "@/features/candidate/pages/dashBoard";
import { createBrowserRouter } from "react-router-dom";


export const router=createBrowserRouter([
    {
        path:"",
        element:<DashboardPage/>
    },
    {
    path:"login",
    element:<Login/>},
    {
        path:"register",
        element:<Register/>
    },{
        path:"verify-otp",
        element:<VerifyRegisterOtp/>
    },{
        path:"forget-password",
        element:<VerifyForgetPasswordOtp/>
    },{
        path:"reset-password",
        element:<ResetPassword/>
    },{
        path:"candidate-profile",
        element:<CandidateProfilePage/>
    },{
        path:"edit-profile",
        element:<EditProfilePage/>
    }
])