import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CSButton from "@/components/ui/cs-button";

import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  profilePictureUrl?: string;
}

interface ProfileHeaderProps {
  user: UserDetails;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const navigate=useNavigate()
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.profilePictureUrl} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} /> {user.email}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={16} /> {user.phone}
          </div>
        </div>
      </div>

      <CSButton onClick={()=>{
        navigate("/edit-profile")
      }}>Edit Profile</CSButton>
    </div>
  );
}
