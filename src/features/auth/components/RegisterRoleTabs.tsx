import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import {REGISTEROLES, type RegisterRole } from "../constatnts/role";

interface RegisterRoleTabsProps {
  defaultRole?: RegisterRole;
  onRoleChange?: (role: RegisterRole) => void;
}

export default function RegisterRoleTabs({ defaultRole = "candidate", onRoleChange }: RegisterRoleTabsProps) {
  const [role, setRole] = useState<RegisterRole>(defaultRole);

  const handleChange = (value: string) => {
    const typed = value as RegisterRole;
    setRole(typed);
    onRoleChange?.(typed);
  };

  return (
    <Tabs defaultValue={defaultRole} value={role} onValueChange={handleChange} className="w-full mb-6">
      <TabsList className="grid grid-cols-2 bg-gray-100 p-1 rounded-lg w-full">
        {REGISTEROLES.map((r) => (
          <TabsTrigger key={r.id} value={r.id}>{r.label}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
