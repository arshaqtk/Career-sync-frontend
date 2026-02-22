import { motion } from "framer-motion";
import { User, Check, X, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

interface RecruiterApprovalCardProps {
    recruiter: {
        _id: string;
        name: string;
        email: string;
        profilePicture?: { url: string };
        createdAt?: string;
    };
    onApprove: () => void;
    onReject: () => void;
    isApproving: boolean;
    isRejecting: boolean;
}

export function RecruiterApprovalCard({
    recruiter,
    onApprove,
    onReject,
    isApproving,
    isRejecting
}: RecruiterApprovalCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                    <div className="relative">
                        {recruiter.profilePicture?.url ? (
                            <img
                                src={recruiter.profilePicture.url}
                                alt={recruiter.name}
                                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-50"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/5">
                                <User size={32} />
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center">
                            <Clock size={12} className="text-white" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 text-lg leading-none">{recruiter.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Mail size={14} className="shrink-0" />
                            <span className="truncate max-w-[180px]">{recruiter.email}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                            REQUESTED ON {recruiter.createdAt ? new Date(recruiter.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <Button
                    onClick={onReject}
                    variant="outline"
                    className="flex-1 rounded-xl border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 gap-2 h-11"
                    disabled={isApproving || isRejecting}
                >
                    <X size={18} />
                    Reject
                </Button>
                <Button
                    onClick={onApprove}
                    className="flex-1 rounded-xl shadow-lg shadow-primary/20 gap-2 h-11"
                    disabled={isApproving || isRejecting}
                >
                    <Check size={18} />
                    Approve
                </Button>
            </div>
        </motion.div>
    );
}
