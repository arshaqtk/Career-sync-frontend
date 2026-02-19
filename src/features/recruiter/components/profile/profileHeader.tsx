import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar"
import { Button } from "@/components/ui/shadcn/button"
import type { RecruiterProfile } from "../../types/Recruiter.type"
import { useNavigate } from "react-router-dom"
import { Camera } from "lucide-react"
import { useUpdateProfileImage } from "../../hooks/useUpdateRecruiterProfile"

interface RecruiterProfileHeaderProps {
  recruiter: RecruiterProfile
  onSecurity?: () => void
}

export function RecruiterProfileHeader({
  recruiter,
}: RecruiterProfileHeaderProps) {
  const navigate = useNavigate();
  const { mutate } = useUpdateProfileImage();

  const handleSelectImage = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    mutate(formData);
  };

  const initials = recruiter.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
          <div className="relative group">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-slate-100 shadow-sm overflow-hidden">
              <AvatarImage src={recruiter.profilePicture?.url} className="object-cover w-full h-full" />
              <AvatarFallback className="text-xl font-bold bg-slate-50 text-slate-400">{initials}</AvatarFallback>
            </Avatar>
            <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full shadow-lg border border-white cursor-pointer hover:bg-blue-700 transition-all transform hover:scale-110">
              <Camera size={14} className="text-white" />
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

          <div className="space-y-1.5 pt-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {recruiter.name}
            </h2>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-slate-600 font-medium text-sm md:text-base">
              <span>{recruiter.role}</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-semibold">{recruiter.recruiterData?.company?.name || "Company not defined"}</span>
            </div>

            <p className="text-sm text-slate-500 font-medium">
              Field: {recruiter.field}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            className="flex-1 md:flex-none bg-blue-700 hover:bg-blue-800 text-white font-bold h-11 px-8 rounded-lg shadow-none"
            onClick={() => navigate("edit")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
