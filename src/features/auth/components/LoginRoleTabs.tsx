import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import {LOGINROLES, type LoginRole } from "../constatnts/role";
import { useRoleStore } from "@/store/role.store";



export default function LoginRoleTabs() {


const setSelectedRole=useRoleStore((s)=>s.setSelectedRole)
const role=useRoleStore((s)=>s.role)

  const handleChange = (value: string) => {
    const typed = value as LoginRole;
    setSelectedRole(typed)
  };

  return (
    <Tabs defaultValue={role} value={role} onValueChange={handleChange} className="w-full mb-6">
      <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-lg w-full">
        {LOGINROLES.map((r) => (
          <TabsTrigger key={r.id} value={r.id}>{r.label}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
