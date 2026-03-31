import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Eye } from "lucide-react";
import type { RecruiterApplicationDTO } from "../../types/application.dto";
import { useNavigate } from "react-router-dom";
import { ResumeModal } from "../modals/resumeModal";

interface ApplicationTableProps {
    applications: RecruiterApplicationDTO[];
    isLoading?: boolean;
    showJobColumn?: boolean;
}

export function ApplicationTable({ applications, isLoading, showJobColumn = true }: ApplicationTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="bg-card rounded-lg border border-gray-200 p-8">
                <div className="animate-pulse space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-border">
                        <TableHead className="font-bold text-foreground/70 h-12 uppercase text-xs tracking-wider">Candidate</TableHead>
                        {showJobColumn && <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Applied For</TableHead>}
                        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Experience</TableHead>
                        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Applied Date</TableHead>
                        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Status</TableHead>
                        <TableHead className="text-right font-bold text-foreground/70 uppercase text-xs tracking-wider">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow
                            key={app.id}
                            className="border-b border-border/30 transition-colors cursor-pointer group"
                            onClick={() => {
                                const path = showJobColumn
                                    ? `/recruiter/applicants/${app.id}`
                                    : `/recruiter/jobs/${app.job.id}/applicants/${app.id}`;
                                navigate(path);
                            }}
                        >
                            <TableCell className="py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{app.candidate.name}</span>
                                    <span className="text-sm text-muted-foreground">{app.candidate.email}</span>
                                </div>
                            </TableCell>
                            {showJobColumn && (
                                <TableCell>
                                    <span className="text-sm font-medium text-foreground/80">{app.job.title}</span>
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium text-foreground">{app.experience} Years</span>
                                    <span className="text-muted-foreground">{app.currentRole}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-foreground/70">
                                {new Date(app.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`font-medium ${app.status === "Pending"
                                        ? "border-blue-600 text-blue-700 bg-blue-50"
                                        : app.status === "Shortlisted"
                                            ? "border-purple-600 text-purple-700 bg-purple-50"
                                            : app.status === "Selected"
                                                ? "border-green-600 text-green-700 bg-green-50"
                                                : "border-red-600 text-red-700 bg-red-50"
                                        }`}
                                >
                                    {app.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-end gap-2">
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <ResumeModal resumeKey={app.candidate.resume} applicationId={app.id} />
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => {
                                            const path = showJobColumn
                                                ? `/recruiter/applicants/${app.id}`
                                                : `/recruiter/jobs/${app.job.id}/applicants/${app.id}`;
                                            navigate(path);
                                        }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
