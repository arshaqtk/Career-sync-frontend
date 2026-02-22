import { useManageRecruiters } from "../hooks/useManageRecruiters";
import useUserData from "@/hooks/useUserData";
import { TableSkeleton } from "@/components/Loaders";
import { RecruiterApprovalCard } from "../components/management/RecruiterApprovalCard";
import { Users, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";
import type { PendingRecruiter } from "../types/Recruiter.type";

export default function ManageRecruitersPage() {
    const { data: user } = useUserData();
    const companyId = user?.recruiterData?.company?._id;
    const {
        pendingRecruiters,
        isLoading,
        approveRecruiter,
        rejectRecruiter,
        isApproving,
        isRejecting
    } = useManageRecruiters(companyId);

    if (isLoading) return <div className="p-8"><TableSkeleton /></div>;

    return (
        <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <ShieldCheck className="text-primary w-8 h-8" />
                    Manage Recruiters
                </h1>
                <p className="text-gray-500 max-w-2xl">
                    Review and approve recruiters who have requested to join {user?.recruiterData?.company?.name}.
                    Approved recruiters will be able to post jobs and manage applications on behalf of your company.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Requests</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingRecruiters.length}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Auto-Approval</p>
                        <p className="text-2xl font-bold text-gray-900">Disabled</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Domain Filtering</p>
                        <p className="text-2xl font-bold text-gray-900">Active</p>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 px-1">
                    Pending Approval ({pendingRecruiters.length})
                </h2>

                {pendingRecruiters.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center"
                    >
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                            <Users size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-1">
                            When new recruiters ask to join your company, they will appear here for your review.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingRecruiters.map((recruiter:PendingRecruiter) => (
                            <RecruiterApprovalCard
                                key={recruiter._id}
                                recruiter={recruiter}
                                onApprove={() => approveRecruiter(recruiter._id)}
                                onReject={() => rejectRecruiter(recruiter._id)}
                                isApproving={isApproving}
                                isRejecting={isRejecting}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
