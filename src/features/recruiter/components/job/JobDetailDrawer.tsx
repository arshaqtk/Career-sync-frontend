import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/shadcn/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/shadcn/alert-dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import {
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    Users,
    Edit,
    Trash2,
    Clock,
    LayoutGrid,
    Info,
    Cpu,
    Power,
} from "lucide-react";
import type { Job } from "../../types/job.type";
import { useNavigate } from "react-router-dom";
import { useJobModalStore } from "../../store/openJobModalStore";
import { useUpdateJobstatus } from "../../hooks/useUpdateJobStatus";

interface JobDetailDrawerProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
}

export function JobDetailDrawer({ job, isOpen, onClose }: JobDetailDrawerProps) {
    const navigate = useNavigate();
    const { openModal } = useJobModalStore();
    const { mutate: updateStatus } = useUpdateJobstatus();

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<Job["status"] | null>(null);

    if (!job) return null;

    const handleToggleStatus = () => {
        const newStatus = job.status === "open" ? "closed" : "open";
        setPendingStatus(newStatus);
        setShowConfirmDialog(true);
    };

    const confirmStatusChange = () => {
        if (pendingStatus) {
            updateStatus({ jobId: job._id!, status: pendingStatus });
            setShowConfirmDialog(false);
            setPendingStatus(null);
        }
    };

    const handleViewApplicants = () => {
        navigate(`/recruiter/jobs/${job._id}/applicants`);
        onClose();
    };

    const handleEdit = () => {
        openModal(job);
        onClose();
    };

    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-white border-l p-0">
                    {/* Header Section */}
                    <div className="px-8 py-6 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1.5">
                                <SheetTitle className="text-2xl font-bold text-slate-900 leading-tight">
                                    {job.title}
                                </SheetTitle>
                                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                        {typeof job?.company=="string"?job?.company:job?.company?.name}
                                    </span>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase border-none shadow-sm ${job.status === "open"
                                        ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                                        : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
                                    }`}
                            >
                                {job.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="px-8 py-8 space-y-10">
                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Button
                                onClick={handleViewApplicants}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-6 rounded-lg transition-all"
                            >
                                <Users className="h-4 w-4 mr-2" />
                                View Applicants ({job.applicationCount || 0})
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleEdit}
                                className="border-slate-200 text-slate-600 font-semibold h-10 px-6 rounded-lg hover:bg-slate-50 transition-all"
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleToggleStatus}
                                className={`ml-auto h-10 px-4 font-semibold rounded-lg transition-all ${job.status === "open"
                                        ? "text-red-500 hover:bg-red-50"
                                        : "text-green-600 hover:bg-green-50"
                                    }`}
                            >
                                {job.status === "open" ? <Trash2 className="h-4 w-4 mr-2" /> : <Power className="h-4 w-4 mr-2" />}
                                {job.status === "open" ? "Close Posting" : "Reopen Position"}
                            </Button>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Briefcase, label: "Job Type", value: job.jobType },
                                { icon: LayoutGrid, label: "Industry", value: job.field },
                                { icon: Clock, label: "Experience", value: `${job.experienceMin}-${job.experienceMax} years` },
                                { icon: DollarSign, label: "Salary", value: job.salary ? `₹${job.salary.toLocaleString()}` : "Not specified" },
                                { icon: MapPin, label: "Location", value: job.location },
                                { icon: Power, label: "Mode", value: job.remote ? "Remote" : "On-site" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-1.5 p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <item.icon className="h-4 w-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <p className="text-[14px] font-semibold text-slate-800 capitalize leading-tight">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Description Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-900">
                                <Info className="h-4 w-4 text-blue-500" />
                                <h3 className="text-sm font-bold uppercase tracking-widest leading-none">Job Description</h3>
                            </div>
                            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        </div>

                        {/* Technology Stack */}
                        {job.skills && job.skills.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Cpu className="h-4 w-4 text-indigo-500" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest leading-none">Required Skills</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="bg-white text-slate-700 border border-slate-200 px-4 py-1.5 text-xs font-semibold rounded-lg shadow-sm"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer Details */}
                        <div className="pt-10 border-t border-slate-100 flex items-center justify-between text-slate-400">
                            <div className="flex items-center gap-4 text-xs font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Draft"}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5" />
                                    <span>{job.applicationCount || 0} applicants</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent className="rounded-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {pendingStatus === "closed" ? "Close Job Posting?" : "Reopen Job Posting?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {pendingStatus === "closed"
                                ? "This will hide the job posting from candidates. You can reopen it at any time."
                                : "This will make the job posting visible to candidates again."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmStatusChange}
                            className={`rounded-lg ${pendingStatus === "closed" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
