import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CSInput from "@/components/ui/cs-input";
import CSButton from "@/components/ui/cs-button";
import CSDivider from "@/components/ui/cs-divider";
import { loginSchema, type LoginFormValues } from "../validators/auth.schema";
import { useRoleStore } from "@/store/role.store";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


type LoginFormInputs = Omit<LoginFormValues, "role">;

export default function LoginForm() {
    const navigate=useNavigate()
    const loginMutation = useLogin();
     const [showPassword, setShowPassword] = useState(false);
  
    const role = useRoleStore((s) => s.role)
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormInputs>(
        { resolver: zodResolver(loginSchema.omit({ role: true })), });



    const onSubmit = (data: LoginFormInputs) => {
        const finalData = { ...data, role };
        loginMutation.mutate(finalData)
        
    };
 
    return (
        <> 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* EMAIL */}
                <CSInput
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.email?.message}
                    {...register("email")}
                />

                {/* PASSWORD */}
                <CSInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                     rightIcon={
                                <button
                                  type="button"
                                  onClick={() => setShowPassword((p) => !p)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              }
                    error={errors.password?.message}
                    {...register("password")}
                />

                {/* REMEMBER + FORGOT */}
                <div className="flex justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-gray-500">Remember me</span>
                    </label>

                    <button type="button" className="text-indigo-600 hover:underline" onClick={()=>{
                        navigate("/auth/forget-password")
                    }}>
                        Forgot password?
                    </button>
                </div>

                <CSButton type="submit" fullWidth
                   disabled={ loginMutation.isPending}>
                    {loginMutation.isPending ? "Sign in..." : "Sign in"}
                </CSButton>
            </form>

            <CSDivider label="or" />

            <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <button className="text-indigo-600 hover:underline font-medium"  onClick={()=>{
                        navigate("/auth/register")
                    }}>
                    Sign up
                </button>
            </p>
        </>
    );
}
