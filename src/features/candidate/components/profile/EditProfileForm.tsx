import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileUpdateSchema,
  type ProfileUpdatePayload,
  type IUser,
} from "../../../../types/profileUpdate.type";

import CSInput from "@/components/ui/cs-input";
import { Button } from "@/components/ui/shadcn/button";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

interface EditProfileFormProps {
  user: IUser;
}

export const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const { mutate, isPending } = useUpdateProfile();

  const form = useForm<ProfileUpdatePayload>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });

  const onSubmit = (data: ProfileUpdatePayload) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
      
      {/* Name */}
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <CSInput
          {...form.register("name")}
          placeholder="Enter your name"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email (Read-only) */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <CSInput
          value={user.email}
          disabled
          className="cursor-not-allowed bg-muted"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Email cannot be changed
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium">Phone</label>
        <CSInput
          {...form.register("phone")}
          placeholder="Enter your phone number"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Updating..." : "Save Changes"}
      </Button>
    </form>
  );
};
