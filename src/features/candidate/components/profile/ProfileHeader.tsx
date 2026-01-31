import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";

import { Briefcase, Camera, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileImage } from "../../hooks/useUpdateProfile";
import { Button } from "@/components/ui/shadcn/button";

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  profilePicture?: {
    url:string;
    updatedAt:string
  };
  field: string;
}

interface ProfileHeaderProps {
  user: UserDetails;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  console.log(user)
  const { mutate } = useUpdateProfileImage();
  const navigate = useNavigate()
  const handleSelectImage = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    mutate(formData);
  };
 return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative group">
          <Avatar className="h-28 w-28 border-4 border-slate-50 shadow-sm">
            <AvatarImage src={user.profilePicture?.url} className="object-cover" />
            <AvatarFallback className="bg-blue-50 text-blue-600 text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <Camera size={16} className="text-slate-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleSelectImage(file);
              }}
            />
          </label>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {user.name}
          </h1>

          <div className="flex flex-wrap gap-y-2 gap-x-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Briefcase size={16} className="text-slate-400" />
              {user.field || "Professional"}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Mail size={16} className="text-slate-400" />
              {user.email}
            </div>
            {user.phone && (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Phone size={16} className="text-slate-400" />
                {user.phone}
              </div>
            )}
            {/* <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <MapPin size={16} className="text-slate-400" />
              {user.location || "Remote"}
            </div> */}
          </div>
        </div>
      </div>

      <Button
        onClick={() => navigate("/edit-profile")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 shadow-sm"
      >
        Edit Profile
      </Button>
    </div>
  );
}
