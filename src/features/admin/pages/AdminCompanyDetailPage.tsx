import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAdminCompanyDetail } from "../hooks/useAdminCompanyDetail"
import { useAdminCompanyActions } from "../hooks/useAdminCompanyActions"
import { AdminCompanyHeader } from "../components/Company/AdminCompanyHeader"
import { AdminCompanyInfo } from "../components/Company/AdminCompanyInfo"
import { AdminCompanyRecruiters } from "../components/Company/AdminCompanyRecruiters"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"

export default function AdminCompanyDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data: response, isLoading, isError, error } = useAdminCompanyDetail(id!)
    const { approveCompany, rejectCompany, blockCompany, unblockCompany, isBlocking, isApproving, isRejecting, isUnblocking } = useAdminCompanyActions()

    const [blockDialogOpen, setBlockDialogOpen] = useState(false)

    if (isLoading) return <SectionSkeleton />
    if (isError || !response?.data) {
        handleRQError(error)
        return <div className="p-10 text-center text-red-500 font-bold">Failed to load company details.</div>
    }

    const company = response.data
    const isProcessing = isBlocking || isApproving || isRejecting || isUnblocking

    const handleApprove = () => {
        approveCompany(company._id)
    }

    const handleReject = () => {
        rejectCompany(company._id)
    }

    const handleBlock = () => {
        setBlockDialogOpen(true)
    }

    const handleUnblock = () => {
        unblockCompany(company._id)
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-10">
            <AdminCompanyHeader
                company={company}
                onApprove={handleApprove}
                onReject={handleReject}
                onBlock={handleBlock}
                onUnblock={handleUnblock}
                isProcessing={isProcessing}
            />

            <AdminCompanyInfo company={company} />

            <AdminCompanyRecruiters
                owner={company.owner}
                recruiters={company.recruiters || []}
            />

            {/* Block Dialog */}
            <ConfirmStatusDialog
                open={blockDialogOpen}
                entityName="company"
                currentStatus="active"
                loading={isBlocking}
                onClose={() => setBlockDialogOpen(false)}
                onConfirm={({ reason }) => {
                    blockCompany(
                        { id: company._id, reason },
                        {
                            onSuccess: () => {
                                setBlockDialogOpen(false)
                            },
                        }
                    )
                }}
            />
        </div>
    )
}
