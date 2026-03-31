import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import { Badge } from "@/components/ui/shadcn/badge";
import type { Job } from "../../types/job.type";
import { JobActions } from "./jobActions";
import { useState } from "react";
import { JobDetailDrawer } from "./JobDetailDrawer";

interface JobTableProps {
    jobs: Job[];
    isLoading?: boolean;
}

export function JobTable({ jobs, isLoading }: JobTableProps) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (job: Job) => {
        setSelectedJob(job);
        setIsDrawerOpen(true);
    };

    if (isLoading) {
        return (
            <div className="bg-card rounded-lg border border-border p-8">
                <div className="animate-pulse space-y-3">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-border">
                            <TableHead className="font-bold text-foreground/70 h-12 uppercase text-xs tracking-wider">Job Title</TableHead>
                            <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Type</TableHead>
                            <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Location</TableHead>
                            <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Applicants</TableHead>
                            <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Status</TableHead>
                            <TableHead className="text-right font-bold text-foreground/70 uppercase text-xs tracking-wider">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow
                                key={job._id}
                                className="border-b border-border/30 transition-colors cursor-pointer group"
                                onClick={() => handleRowClick(job)}
                            >
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</span>
                                        <span className="text-sm text-muted-foreground">{typeof job?.company=="string"?job?.company:job?.company?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="secondary"
                                        className="font-normal capitalize bg-muted/50 text-muted-foreground border-0"
                                    >
                                        {job.jobType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-foreground/70">{job.location}</TableCell>
                                <TableCell>
                                    <span className="font-semibold text-foreground">{job.applicationCount || 0}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`font-medium capitalize ${job.status === "open"
                                                ? "border-green-600 text-green-700 bg-green-50"
                                                : job.status === "closed"
                                                    ? "border-red-600 text-red-700 bg-red-50"
                                                    : "border-orange-600 text-orange-700 bg-orange-50"
                                            }`}
                                    >
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                    <JobActions id={job._id!} status={job.status} job={job} asDropdown />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <JobDetailDrawer
                job={selectedJob}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}
