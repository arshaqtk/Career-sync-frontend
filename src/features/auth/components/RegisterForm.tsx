import { Mail, Lock, User,Eye, EyeOff, Loader2, ArrowRight, } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import  Input  from "@/components/ui/cs-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Separator } from "@/components/ui/shadcn/separator";

import { registerSchema, type RegisterFormValues } from "../validators/auth.schema";
import { useRegister } from "@/hooks/useAuth";
import { useRegisterRoleStore } from "@/store/role.store";
import CSButton from "@/components/ui/cs-button";

type RegisterFormInputs = Omit<RegisterFormValues, "role">;

const FIELD_OPTIONS = [
  { label: "IT / Software", value: "IT" },
  { label: "Healthcare / Medical", value: "Healthcare" },
  { label: "Design", value: "Design" },
  { label: "Education", value: "Education" },
  { label: "Finance", value: "Finance" },
  { label: "Other", value: "Other" },
];

export default function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const role = useRegisterRoleStore((s) => s.role);

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema.omit({ role: true })),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      field: "",
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    const finalData = { ...data, role };
    registerMutation.mutate(finalData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" icon={<User className="h-4 w-4" />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FIELD / DOMAIN */}
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field / Domain</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 w-[100%]">
                    <SelectValue placeholder="Select your field" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FIELD_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PASSWORD */}
        <FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={<Lock className="h-4 w-4" />}
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
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        {/* CONFIRM PASSWORD */}
       <FormField
  control={form.control}
  name="confirmPassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Confirm Password</FormLabel>
      <FormControl>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        {/* SUBMIT */}
       <CSButton 
         type="submit" 
         fullWidth
         className="relative h-12 overflow-hidden shadow-lg shadow-primary/25 transition-all active:scale-[0.98] group"
         disabled={registerMutation.isPending}
       >
         {registerMutation.isPending ? (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-5 w-5 animate-spin text-white" />
      <span>Authenticating...</span>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-2">
      <span>Register</span>
      {/* Arrow appears on hover and slides slightly to the right */}
      <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 opacity-70" />
    </div>
  )}
        </CSButton>
      </form>

      <Separator className="my-6" />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => navigate("/auth/login")}
        >
          Sign in
        </button>
      </p>
    </Form>
  );
}
