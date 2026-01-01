import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { REGISTEROLES, type RegisterRole } from "../constatnts/role";

interface RegisterRoleTabsProps {
  value: RegisterRole;
  onRoleChange: (role: RegisterRole) => void;
}

export default function RegisterRoleTabs({
  value,
  onRoleChange,
}: RegisterRoleTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onRoleChange(v as RegisterRole)}
      className="w-full mb-6"
    >
      <TabsList className="grid grid-cols-2 bg-gray-100 p-1 rounded-lg w-full">
        {REGISTEROLES.map((r) => (
          <TabsTrigger key={r.id} value={r.id}>
            {r.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
