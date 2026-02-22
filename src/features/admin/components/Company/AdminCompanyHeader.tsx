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
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="h-16 w-16 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border">
                    {company.logo?.url ? (
                        <img src={company.logo.url} alt={company.name} className="h-full w-full object-cover" />
                    ) : (
                        <Building2 className="h-8 w-8 text-slate-400" />
                    )}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{company.industry}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-muted-foreground">{company.location}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <VerificationBadge status={company.verificationStatus} />
                        <ActiveBadge isActive={company.isActive} />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {company.verificationStatus === "pending" && (
                    <>
                        <Button
                            variant="outline"
                            className="border-green-200 text-green-700 hover:bg-green-50"
                            onClick={onApprove}
                            disabled={isProcessing}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button
                            variant="outline"
                            className="border-red-200 text-red-700 hover:bg-red-50"
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
                            onClick={onBlock}
                            disabled={isProcessing}
                        >
                            <Ban className="mr-2 h-4 w-4" /> Block Company
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="border-green-200 text-green-700 hover:bg-green-50"
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
