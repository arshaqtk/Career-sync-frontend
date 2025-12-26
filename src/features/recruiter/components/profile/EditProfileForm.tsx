import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileUpdateSchema,
  type ProfileUpdatePayload,
  type IUser,
} from "../../../../types/profileUpdate.type";

import {Input} from "@/components/ui/shadcn/input";
import {Button} from "@/components/ui/shadcn/button";
import { useUpdateRecruiterProfile } from "../../hooks/useUpdateRecruiterProfile";

interface EditProfileFormProps {
  user: IUser;
}

export const RecruiterEditProfileForm = ({ user }: EditProfileFormProps) => {
  const { mutate, isPending } = useUpdateRecruiterProfile();

  const form = useForm<ProfileUpdatePayload>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: user,
  });

  const onSubmit = (data: ProfileUpdatePayload) => {
    mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your personal information below
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-lg border bg-background p-6 space-y-5">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              {...register("name")}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              {...register("phone")}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Email (Read-only) */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Email Address</label>
          <Input
            {...register("email")}
            disabled
            className="bg-muted cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed. Contact support if needed.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
