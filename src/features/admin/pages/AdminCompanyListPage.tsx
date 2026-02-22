import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "../components/shared/PageHeader"
import { CompanyTable } from "../components/Company/CompanyTable"
import { useAdminCompanies } from "../hooks/useAdminCompanies"
import { useAdminCompanyActions } from "../hooks/useAdminCompanyActions"
import { Input } from "@/components/ui/shadcn/input"
import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"

export default function AdminCompanyListPage() {
    const navigate = useNavigate()

    // 🔹 pagination + filters
    const [page, setPage] = useState(1)
    const limit = 10
    const [verificationStatus, setVerificationStatus] = useState<"pending" | "approved" | "rejected" | "all">("all")
    const [isActive, setIsActive] = useState<"true" | "false" | "all">("all")
    const [search, setSearch] = useState("")

    const { data, isLoading, error } = useAdminCompanies({
        page,
        limit,
        verificationStatus,
        isActive,
        search,
    })

    const { approveCompany, rejectCompany, blockCompany, unblockCompany, isBlocking } = useAdminCompanyActions()

    // 🔹 dialog state
    const [blockDialogOpen, setBlockDialogOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    if (isLoading) return <SectionSkeleton />
    if (error) handleRQError(error)

    const companies = data?.data?.companies || []
    const pagination = data?.data?.pagination

    const handleApprove = (id: string) => {
        approveCompany(id)
    }

    const handleReject = (id: string) => {
        rejectCompany(id)
    }

    const handleBlockAction = (id: string) => {
        setSelectedId(id)
        setBlockDialogOpen(true)
    }

    const handleUnblock = (id: string) => {
        unblockCompany(id)
    }

    return (
        <>
            <PageHeader
                title="Companies"
                subtitle="Manage and verify company profiles"
            />

            <Card>
                <CardContent className="space-y-4 pt-6">
                    {/* 🔍 Filters */}
                    <div className="flex flex-wrap gap-3">
                        <Input
                            placeholder="Search by company name..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }}
                            className="max-w-sm"
                        />

                        <Select
                            value={verificationStatus}
                            onValueChange={(val:"pending" | "approved" | "rejected" | "all") => {
                                setVerificationStatus(val)
                                setPage(1)
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Verification" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Verification</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={isActive}
                            onValueChange={(val:"true" | "false" | "all") => {
                                setIsActive(val)
                                setPage(1)
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Blocked</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 📋 Table */}
                    <CompanyTable
                        companies={companies}
                        onView={(id) => navigate(`/admin/companies/${id}`)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onBlock={handleBlockAction}
                        onUnblock={handleUnblock}
                    />

                    {/* 🔢 Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-end items-center gap-3 pt-2">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>

                            <Button
                                variant="outline"
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    {/* 🔒 Confirm Block */}
                    <ConfirmStatusDialog
                        open={blockDialogOpen}
                        entityName="company"
                        currentStatus="active"
                        loading={isBlocking}
                        onClose={() => setBlockDialogOpen(false)}
                        onConfirm={({ reason }) => {
                            blockCompany(
                                { id: selectedId!, reason },
                                {
                                    onSuccess: () => {
                                        setBlockDialogOpen(false)
                                        setSelectedId(null)
                                    },
                                }
                            )
                        }}
                    />
                </CardContent>
            </Card>
        </>
    )
}
