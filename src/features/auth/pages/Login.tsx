
import LoginRoleTabs from "../components/LoginRoleTabs";
import LoginForm from "../components/LoginForm";
import LoginFooter from "../components/LoginFooter";



export default function Login() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-md border">
          <LoginRoleTabs />
          <LoginForm />
        </div>
        <LoginFooter />
      </div>
    </div>
  );
}
