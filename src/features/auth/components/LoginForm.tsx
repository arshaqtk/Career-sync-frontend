import { Mail, Lock, EyeOff, Eye, Loader2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CSInput from "@/components/ui/cs-input";
import CSDivider from "@/components/ui/cs-divider";
import { loginSchema, type LoginFormValues } from "../validators/auth.schema";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CSButton from "@/components/ui/cs-button";

type LoginFormInputs = LoginFormValues

export default function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

//   const role = useRoleStore((s) => s.role);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const finalData = { ...data };
    loginMutation.mutate(finalData);
  };

  const GOOGLE_LOGIN_URL = "http://localhost:8000/api/auth/google";

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="w-full max-w-[460px] mx-auto">
      {/* Social Logins */}
      <div className="grid  mb-8">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95"
        >
          <img
            alt="Google"
            className="w-5 h-5"
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
          />
          <span className="dark:text-white">Google</span>
        </button>
        {/* <button
          type="button"
          className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95"
        >
          <svg className="w-5 h-5 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="dark:text-white">LinkedIn</span>
        </button> */}
      </div>

      <CSDivider label="or continue with email" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
        {/* EMAIL */}
        <CSInput
          label="Email Address"
          type="email"
          placeholder="alex@example.com"
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* PASSWORD */}
        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
             <label className="text-sm font-semibold dark:text-gray-200">Password</label>
             <button 
               type="button" 
               className="text-xs font-bold text-primary hover:underline"
               onClick={() => navigate("/auth/forget-password")}
             >
               Forgot password?
             </button>
          </div>
          <CSInput
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        {/* REMEMBER ME */}
        <div className="flex items-center gap-2 px-1">
          <input 
            type="checkbox" 
            id="remember"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 dark:bg-white/5 dark:border-white/10" 
          />
          <label htmlFor="remember" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none">
            Keep me logged in
          </label>
        </div>

       <CSButton 
  type="submit" 
  fullWidth
  className="relative h-12 overflow-hidden shadow-lg shadow-primary/25 transition-all active:scale-[0.98] group"
  disabled={loginMutation.isPending}
>
  {loginMutation.isPending ? (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-5 w-5 animate-spin text-white" />
      <span>Authenticating...</span>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-2">
      <span>Sign In</span>
      {/* Arrow appears on hover and slides slightly to the right */}
      <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 opacity-70" />
    </div>
  )}

  {/* Optional: Subtle gradient overlay for a polished look */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
</CSButton>
      </form>

      {/* FOOTER */}
      <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
        New to CareerSync?{" "}
        <button
          type="button"
          className="text-primary font-bold hover:underline"
          onClick={() => navigate("/auth/register")}
        >
          Create an account
        </button>
      </p>
    </div>
  );
}