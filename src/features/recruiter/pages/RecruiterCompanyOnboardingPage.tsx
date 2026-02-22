import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { CompanySearch } from "../components/onboarding/CompanySearch";
import { CreateCompanyForm } from "../components/onboarding/CreateCompanyForm";
import { Building2, Users, Plus, CheckCircle2, Shield, Zap, Clock } from "lucide-react";
import useUserData from "@/hooks/useUserData";

const STEPS = [
    { icon: Building2, text: "Set up your company profile" },
    { icon: Shield, text: "Get verified by our admin team" },
    { icon: Zap, text: "Start posting jobs immediately" },
];

export default function RecruiterCompanyOnboardingPage() {
    const { data: user } = useUserData();

    const isPending = user?.recruiterData?.companyApprovalStatus === "pending";

    return (
        <div className="min-h-screen flex bg-white">
            {/* ─── Left Panel ─── */}
            <div className="hidden lg:flex w-[40%] bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
                {/* grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Logo */}
                <div className="relative z-10">
                    <span className="text-white font-bold text-xl tracking-tight">CareerSync</span>
                    <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                        Recruiter
                    </span>
                </div>

                {/* Centre copy */}
                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white leading-snug">
                            {isPending ? "Waiting for Approval" : "Let's get your company set up."}
                        </h2>
                        <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-sm">
                            {isPending
                                ? "You have requested to join a company. We're waiting for the company owner to approve your request."
                                : "Join an existing company or register a new one. It only takes a minute to start hiring top talent."}
                        </p>
                    </div>

                    {/* Steps (Only show if not pending) */}
                    {!isPending && (
                        <div className="space-y-4">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">How it works</p>
                            {STEPS.map((step, i) => (
                                <div key={step.text} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-blue-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom info */}
                <div className="relative z-10 border border-white/10 rounded-xl p-5 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-white text-sm font-semibold">Company verification</p>
                            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                All companies undergo verification to ensure a trusted hiring environment for candidates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Right Panel ─── */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 overflow-y-auto">
                {/* Mobile header */}
                <div className="lg:hidden mb-8 text-center">
                    <span className="font-bold text-lg text-slate-900 tracking-tight">CareerSync</span>
                    <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                        Recruiter
                    </span>
                </div>

                <div className="w-full max-w-2xl">
                    {isPending ? (
                        <div className="text-center py-16 px-6 border border-slate-100 rounded-2xl bg-slate-50">
                            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">Approval Pending</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-8">
                                Your request to join the company has been sent to the owner. You will gain access to the dashboard once they approve your request.
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Check Status
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-slate-900">Company Onboarding</h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    To get started, join an existing company or create a new one.
                                </p>
                            </div>

                            {/* Tabs */}
                            <Tabs defaultValue="join" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-lg h-11">
                                    <TabsTrigger
                                        value="join"
                                        className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md transition-all"
                                    >
                                        <Users className="w-4 h-4" />
                                        Join Existing
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="create"
                                        className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create New
                                    </TabsTrigger>
                                </TabsList>

                                <div className="mt-6">
                                    <TabsContent value="join">
                                        <CompanySearch />
                                    </TabsContent>

                                    <TabsContent value="create">
                                        <CreateCompanyForm />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
