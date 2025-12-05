import Sidebar from "@/components/Sidebar/Sidebar";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import useUserData from "@/hooks/useUserData";



export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
const { data: user, isLoading } = useUserData();
 if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex">
      <Sidebar role={user?.role}/>

      <div className="flex-1">
        <TopNavbar />
        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
