import { useState } from "react";
import { AdminHeader } from "../components/dashboard/AdminHeader";
import { PlatformStatsCards } from "../components/dashboard/PlatformStatsCards";
import { RecruiterOverview } from "../components/dashboard/RecruiterOverview";
import { SystemHealth } from "../components/dashboard/SystemHealth";
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useRecruiterStatusAction } from "../hooks/useToggleRecruiterStatus";
import { AppLoader } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { PlatformGrowthChart } from "../components/dashboard/PlatformGrowthChart";
import { UserActivityChart } from "../components/dashboard/UserActivityChart";
import { CategoryDistributionChart } from "../components/dashboard/CategoryDistributionChart";
import { ApplicationStatusChart } from "../components/dashboard/ApplicationStatusChart";
import { JobStatusChart } from "../components/dashboard/JobStatusChart";

export default function AdminDashboardPage() {

    const { data: dashboardData, isLoading, error } = useAdminDashboard()
    const { isPending, mutate } = useRecruiterStatusAction()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [currentStatus, setCurrentStatus] =
        useState<"active" | "blocked" | null>(null)

    const normalizeStatus = (
        status: "Active" | "Blocked"
    ): "active" | "blocked" =>
        status === "Active" ? "active" : "blocked"

    if (isLoading) return <AppLoader />
    if (error) handleRQError(error)

    const mapStatsToCards = (stats?: {
        totalUsers: number
        recruiters: number
        candidates: number
        totalCompanies: number
        approvedCompanies: number
        pendingCompanies: number
        openJobs: number
        pausedJobs: number
        applicationsLast30Days: number
        applicationsToday: number
    }) => {
        if (!stats) return undefined

        return [
            { label: "Total Users", value: stats.totalUsers,type: "users" },
            { label: "Recruiters", value: stats.recruiters,type: "companies" },
            { label: "Candidates", value: stats.candidates,type: "new-users" },
            { label: "Companies", value: stats.totalCompanies,type: "companies" },
            { label: "Open Jobs", value: stats.openJobs,type: "jobs" },
            { label: "Apps (30 Days)", value: stats.applicationsLast30Days,type: "apps" },
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
        <div className="grid grid-cols-12 gap-8 p-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
            {/* Header Section */}
            <div className="col-span-12">
                <AdminHeader 
                    title="Platform Insights" 
                    subtitle="Real-time analytics and management dashboard" 
                />
            </div>

            {/* Stats Overview */}
            <div className="col-span-12">
                <PlatformStatsCards
                    data={mapStatsToCards(dashboardData?.stats)}
                    loading={isLoading}
                />
            </div>

            {/* Growth Chart Section */}
            <div className="col-span-12 lg:col-span-8">
                <PlatformGrowthChart data={dashboardData?.charts?.userGrowth} />
            </div>
            
            <div className="col-span-12 lg:col-span-4">
                <UserActivityChart data={dashboardData?.charts?.activityData} />
            </div>

            {/* Detailed Analytics Section */}
            <div className="col-span-12 lg:col-span-4">
                 <CategoryDistributionChart data={dashboardData?.charts?.categoryDistribution} />
            </div>

            <div className="col-span-12 lg:col-span-4">
                <ApplicationStatusChart data={dashboardData?.charts?.applicationStatusDistribution} />
            </div>

            <div className="col-span-12 lg:col-span-4">
                <JobStatusChart data={dashboardData?.charts?.jobStatusDistribution} />
            </div>

            <div className="col-span-12 lg:col-span-8">
                <RecruiterOverview
                    data={dashboardData?.recruiterOverview}
                    loading={isLoading}
                    onToggleStatus={handleToggleRecruiterStatus}
                />
            </div>

            {/* Health and Status Section */}
            <div className="col-span-12 lg:col-span-4">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                         <SystemHealth loading={isLoading} data={dashboardData?.systemHealth} />
                    </div>
                </div>
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
        </div>
    )
}
