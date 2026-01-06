import { useState } from "react";
import { AdminHeader } from "../components/dashboard/AdminHeader";
import { JobModeration } from "../components/dashboard/JobModeration";
import { PlatformStatsCards } from "../components/dashboard/PlatformStatsCards";
import { RecentSystemLogs } from "../components/dashboard/RecentSystemLogs";
import { RecruiterOverview } from "../components/dashboard/RecruiterOverview";
import { SystemHealth } from "../components/dashboard/SystemHealth";
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useRecruiterStatusAction } from "../hooks/useToggleRecruiterStatus";
import { AppLoader } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function AdminDashboardPage() {

    const { data: dashboardData, isLoading ,error} = useAdminDashboard()
    const { isPending, mutate } = useRecruiterStatusAction()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [currentStatus, setCurrentStatus] =
        useState<"active" | "blocked" | null>(null)

    const normalizeStatus = (
        status: "Active" | "Blocked"
    ): "active" | "blocked" =>
        status === "Active" ? "active" : "blocked"

    if (isLoading) return <AppLoader/>
  if(error)handleRQError(error)

    const mapStatsToCards = (stats?: {
        totalUsers: number
        recruiters: number
        candidates: number
        jobs: number
        applicationsLast30Days: number
    }) => {
        if (!stats) return undefined

        return [
            { label: "Total Users", value: stats.totalUsers },
            { label: "Recruiters", value: stats.recruiters },
            { label: "Candidates", value: stats.candidates },
            { label: "Job Posts", value: stats.jobs },
            { label: "Applications (30d)", value: stats.applicationsLast30Days },
        ]
    }
    const handleToggleRecruiterStatus = (
        recruiterId: string,
        status: "Active" | "Blocked"
    ) => {
        setSelectedId(recruiterId)
        setCurrentStatus(normalizeStatus(status))
        setDialogOpen(true)
    }
    return (
        <div className="grid grid-cols-12 gap-6 p-6">
            <div className="col-span-12">
                <AdminHeader />
            </div>

            <div className="col-span-12">
                <PlatformStatsCards
                    data={mapStatsToCards(dashboardData?.stats)}
                    loading={isLoading}
                />
            </div>

            <div className="col-span-12 lg:col-span-8">
                <RecruiterOverview
                    data={dashboardData?.recruiterOverview}
                    loading={isLoading}
                    onToggleStatus={handleToggleRecruiterStatus}
                />
            </div>

            <ConfirmStatusDialog
                open={dialogOpen}
                entityName="recruiter"
                currentStatus={currentStatus}
                loading={isPending}
                onClose={() => setDialogOpen(false)}
                onConfirm={({ currentStatus, reason }) => {
                    mutate(
                        {
                            recruiterId: selectedId!,
                            currentStatus,
                            reason,
                        },
                        {
                            onSuccess: () => {
                                setDialogOpen(false)
                                setSelectedId(null)
                                setCurrentStatus(null)
                            },
                        }
                    )
                }}
            />

            <div className="col-span-12 lg:col-span-4">
                <SystemHealth loading={isLoading} data={dashboardData?.systemHealth} />
            </div>

            <div className="col-span-12">
                <JobModeration loading={isLoading} data={dashboardData?.jobModeration} />
            </div>

            <div className="col-span-12">
                <RecentSystemLogs loading={isLoading} />
            </div>
        </div>
    )
}
