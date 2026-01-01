import RegisterForm from "../components/RegisterForm";
import RegisterRoleTabs from "../components/RegisterRoleTabs";
import { useRegisterRoleStore } from "@/store/role.store";



export default function Register() {
  const{setSelectedRole,role}=useRegisterRoleStore()
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-md border">
        

<RegisterRoleTabs
  value={role}
  onRoleChange={setSelectedRole}
/>
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}