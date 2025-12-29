import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar"

export default function AdminTopNavbar() {
  return (
    <div className="h-full flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <Avatar>
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  )
}
