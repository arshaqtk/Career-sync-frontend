import { Mail, Lock, EyeOff, Eye, Loader2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CSInput from "@/components/ui/cs-input";
import { loginSchema, type LoginFormValues } from "../validators/auth.schema";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const GOOGLE_LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/google`;

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="w-full">
      {/* Social Logins */}
      {/* Google Sign In */}
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full flex items-center justify-center gap-2.5 h-11 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <img
          alt="Google"
          className="w-4 h-4"
          src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
        />
        Continue with Google
      </button>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-xs text-slate-400 font-medium">or sign in with email</span>
        </div>
      </div>

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
        {/* <div className="flex items-center gap-2 px-1">
          <input 
            type="checkbox" 
            id="remember"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 dark:bg-white/5 dark:border-white/10" 
          />
          <label htmlFor="remember" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none">
            Keep me logged in
          </label>
        </div> */}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-500">
        New to CareerSync?{" "}
        <button
          type="button"
          className="text-blue-600 font-semibold hover:underline"
          onClick={() => navigate("/auth/register")}
        >
          Create an account
        </button>
      </p>
    </div>
  );
}