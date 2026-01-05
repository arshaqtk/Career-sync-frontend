import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { useResetPassword } from "@/hooks/usePassword"
import { passwordSchema } from "@/features/auth/validators/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { Navigate, useLocation } from "react-router-dom"
import { z } from "zod"

type PasswordInputs = z.infer<typeof passwordSchema>

export default function ResetPassword() {
  const { state } = useLocation()
  const email = state?.email
  const resetToken = state?.resetToken

  const form = useForm<PasswordInputs>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate: resetPassword, isPending } = useResetPassword()

  const onSubmit = (data: PasswordInputs) => {
    resetPassword({ ...data, email, resetToken })
  }

  if (!resetToken) {
    return <Navigate to="/unAuthorized" />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
          <p className="text-sm text-muted-foreground">
            Enter a new password for your account
          </p>
        </div>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-9"
                        {...field}
                      />
                    </div>
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
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
