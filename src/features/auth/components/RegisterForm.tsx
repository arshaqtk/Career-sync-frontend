import { Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Separator } from "@/components/ui/shadcn/separator";

import { registerSchema, type RegisterFormValues } from "../validators/auth.schema";
import { useRegister } from "@/queries/auth/useAuth";
import { useRegisterRoleStore } from "@/store/role.store";

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
console.log(role)
  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data)
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
                <Input type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} {...field} />
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
                <Input type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT */}
        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Signing up..." : "Sign up"}
        </Button>
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
