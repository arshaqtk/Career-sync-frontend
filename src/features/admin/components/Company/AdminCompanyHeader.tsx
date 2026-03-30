import { Building2, CheckCircle, XCircle, Ban, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/shadcn/button"
import { VerificationBadge, ActiveBadge } from "./CompanyBadges"
import { useNavigate } from "react-router-dom"

interface AdminCompanyHeaderProps {
    company: {
        _id: string
        name: string
        logo?: { url: string }
        industry: string
        location: string
        verificationStatus: "pending" | "approved" | "rejected"
        isActive: boolean
    }
    onApprove: () => void
    onReject: () => void
    onBlock: () => void
    onUnblock: () => void
    isProcessing: boolean
}

export function AdminCompanyHeader({
    company,
    onApprove,
    onReject,
    onBlock,
    onUnblock,
    isProcessing,
}: AdminCompanyHeaderProps) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="flex items-center gap-6 relative z-10">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate(-1)} 
                    className="rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                
                <div className="relative">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
                        {company?.logo?.url ? (
                            <img src={company?.logo?.url} alt={company?.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                            <Building2 className="h-10 w-10 text-slate-500" />
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                        {company.isActive && (
                            <div className="h-6 w-6 rounded-full bg-green-500 border-4 border-[#151823] flex items-center justify-center shadow-lg">
                                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">{company?.name}</h1>
                        <div className="flex gap-2">
                            <VerificationBadge status={company?.verificationStatus} />
                            <ActiveBadge isActive={company?.isActive} />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                        <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{company?.industry}</span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {company?.location}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 relative z-10">
                {company.verificationStatus === "pending" && (
                    <>
                        <Button
                            variant="outline"
                            className="bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-xl active:scale-95 transition-all px-6"
                            onClick={onApprove}
                            disabled={isProcessing}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-50 hover:text-white rounded-xl active:scale-95 transition-all px-6"
                            onClick={onReject}
                            disabled={isProcessing}
                        >
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                    </>
                )}
                {company.verificationStatus === "approved" && (
                    company.isActive ? (
                        <Button
                            variant="destructive"
                            className="rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 active:scale-95 transition-all px-6"
                            onClick={onBlock}
                            disabled={isProcessing}
                        >
                            <Ban className="mr-2 h-4 w-4" /> Block Company
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl active:scale-95 transition-all px-6"
                            onClick={onUnblock}
                            disabled={isProcessing}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" /> Unblock Company
                        </Button>
                    )
                )}
            </div>
        </div>
    )
}
