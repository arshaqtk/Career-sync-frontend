import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CSInput from "@/components/ui/cs-input";
import CSButton from "@/components/ui/cs-button";
import CSDivider from "@/components/ui/cs-divider";

import { registerSchema, type RegisterFormValues } from "../validators/auth.schema";
import { useRegister } from "@/queries/auth/useAuth";
import { useRegisterRoleStore } from "@/store/role.store";
import { useNavigate } from "react-router-dom";

type RegisterFormInputs = Omit<RegisterFormValues, "role">;

export default function RegisterForm() {
    const navigate = useNavigate();
    const registerMutation = useRegister();
    const role = useRegisterRoleStore((s) => s.role)

    const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormInputs>(
        { resolver: zodResolver(registerSchema.omit({ role: true })), });

    const onSubmit = (data: RegisterFormInputs) => {
        const finalData = { ...data, role };
        registerMutation.mutate(finalData)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CSInput
                    label="Name"
                    type="text"
                    placeholder="your name"
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.name?.message}
                    {...register("name")}
                />
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
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                    error={errors.password?.message}
                    {...register("password")}
                />
                <CSInput
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                    error={errors.password?.message}
                    {...register("confirmPassword")}
                />
                <div className="text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-gray-500">Remember me</span>
                    </label>
                </div>

                <CSButton type="submit" fullWidth disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Sign up..." : "Sign up"}
                </CSButton>
            </form>

            <CSDivider label="or" />

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button className="text-indigo-600 hover:underline font-medium" onClick={() => {
                    navigate("/login")
                }}>
                    Sign in
                </button>
            </p>
        </>
    );
}
