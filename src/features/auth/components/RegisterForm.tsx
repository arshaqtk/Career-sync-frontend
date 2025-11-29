import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CSInput from "@/components/ui/cs-input";
import CSButton from "@/components/ui/cs-button";
import CSDivider from "@/components/ui/cs-divider";

import { registerSchema, type RegisterFormValues } from "../../../validators/auth.schema";


export default function RegisterForm() {
    const {register,handleSubmit,formState: { errors },} = useForm<RegisterFormValues>({resolver: zodResolver(registerSchema),});

    const onSubmit = (data: RegisterFormValues) => {
        console.log("VALID FORM:", data);
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
                    {...register("confirmpassword")}
                />
               <div className="text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-gray-500">Remember me</span>
                    </label>
                </div>

                <CSButton type="submit" fullWidth>
                    Sign up
                </CSButton>
            </form>

            <CSDivider label="or" />

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button className="text-indigo-600 hover:underline font-medium">
                    Sign in
                </button>
            </p>
        </>
    );
}
