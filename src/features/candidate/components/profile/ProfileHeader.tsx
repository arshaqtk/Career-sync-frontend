import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";
import CSButton from "@/components/ui/cs-button";

import { Briefcase, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileImage } from "../../hooks/useUpdateProfile";

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  profilePictureUrl?: string;
  field: string;
}

interface ProfileHeaderProps {
  user: UserDetails;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { mutate } = useUpdateProfileImage();
  const navigate = useNavigate()
  const handleSelectImage = (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    mutate(formData);
  };
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 relative">
          <AvatarImage src={user.profilePictureUrl} />
          <AvatarFallback>U</AvatarFallback>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            title=" "
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleSelectImage(file);
            }}
          />
        </Avatar>

        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} /> {user.email}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={16} /> {user.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={16} />
            {user.field}
          </div>
        </div>
      </div>

      <CSButton onClick={() => {
        navigate("/edit-profile")
      }}>Edit Profile</CSButton>
    </div>
  );
}
