import CSButton from '@/components/ui/cs-button';
import CSInput from '@/components/ui/cs-input';
import { useResetPassword } from '@/queries/auth/usePassword';
import { passwordSchema } from '@/validators/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Navigate, useLocation } from 'react-router-dom';

interface PasswordInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {

  const { register, handleSubmit, formState: { errors } } = 
    useForm<PasswordInputs>({
      resolver: zodResolver(passwordSchema)
    });

  const { state } = useLocation();
  const email = state?.email;
  const resetToken = state?.resetToken;

  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = (data: PasswordInputs) => {
    resetPassword({ ...data, email, resetToken });
  };

 
  if (!resetToken) {
    return <Navigate to="/unAuthorized" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <CSButton
        type="submit"
        fullWidth
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Reset Password"}
      </CSButton>

    </form>
  );
}
