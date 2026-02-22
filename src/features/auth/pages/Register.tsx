import RegisterForm from "../components/RegisterForm";
import RegisterRoleTabs from "../components/RegisterRoleTabs";
import { useRegisterRoleStore } from "@/store/role.store";
import { Briefcase, Users, Building2, CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Build your professional profile",
  "Get matched with relevant opportunities",
  "Hear back from employers faster",
];

export default function Register() {
  const { setSelectedRole, role } = useRegisterRoleStore();

  return (
    <div className="min-h-screen flex bg-white">
      {/* ─── Left Panel ─── */}
      <div className="hidden lg:flex w-[44%] bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">CareerSync</span>
          </div>
        </div>

        {/* Centre copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white leading-snug">
              Join thousands of<br />professionals today.
            </h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Whether you're looking for your next job or your next great hire, CareerSync has you covered.
            </p>
          </div>

          {/* Role cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
              <Users className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-white text-sm font-semibold">Job Seekers</p>
              <p className="text-slate-400 text-xs mt-1">Discover roles that fit your skills</p>
            </div>
            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
              <Building2 className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="text-white text-sm font-semibold">Recruiters</p>
              <p className="text-slate-400 text-xs mt-1">Find talent quickly and efficiently</p>
            </div>
          </div>

          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[
            { value: "50K+", label: "Candidates" },
            { value: "10K+", label: "Companies" },
            { value: "120K+", label: "Jobs Posted" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white font-bold text-lg">{s.value}</p>
              <p className="text-slate-500 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Right Panel ─── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">CareerSync</span>
        </div>

        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
            <p className="text-slate-500 text-sm mt-1">Start your journey with CareerSync today</p>
          </div>

          {/* Role Tabs */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">I am a</p>
            <RegisterRoleTabs value={role} onRoleChange={setSelectedRole} />
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}