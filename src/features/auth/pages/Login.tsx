import LoginForm from "../components/LoginForm";
import LoginFooter from "../components/LoginFooter";
import { Briefcase, CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "Access thousands of verified job listings",
  "Connect with top recruiters directly",
  "Track your applications in real time",
];

export default function Login() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* ─── Left Panel ─── */}
      <div className="hidden lg:flex w-[44%] bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            {/* <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div> */}
            <span className="text-white font-bold text-xl tracking-tight">CareerSync</span>
          </div>
        </div>

        {/* Centre copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white leading-snug">
              Your next career move<br />starts here.
            </h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Join thousands of professionals who've found their dream jobs through CareerSync.
            </p>
          </div>

          <ul className="space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom testimonial */}
        <div className="relative z-10 border border-white/10 rounded-xl p-5 bg-white/5 backdrop-blur-sm">
          <p className="text-slate-300 text-sm italic leading-relaxed">
            "CareerSync helped me land my dream role within 3 weeks. The process was seamless."
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white font-bold">A</div>
            <div>
              <p className="text-white text-xs font-semibold">Alex Johnson</p>
              <p className="text-slate-500 text-xs">Senior Engineer, Stripe</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right Panel ─── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">CareerSync</span>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to continue to your account</p>
          </div>

          <LoginForm />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}
