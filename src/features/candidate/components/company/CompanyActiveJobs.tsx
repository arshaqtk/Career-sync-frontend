import { MapPin, Clock, ChevronRight, DollarSign } from 'lucide-react';
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { Job } from '@/features/recruiter/types/job.type';
import { formatDistanceToNow } from 'date-fns'; // Optional: for cleaner "2 days ago" labels

export const CompanyActiveJobs = ({ jobs }: { jobs: Job[] }) => {
    return (
        <section className="space-y-6">
            {/* Header with cleaner typography */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <div>
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                        Open Roles
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 px-2.5">
                            {jobs.length}
                        </Badge>
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Explore current opportunities to join our team</p>
                </div>
                <Button variant="outline" size="sm" className="hidden md:flex text-slate-600 font-medium border-slate-200 hover:bg-slate-50 transition-colors">
                    View All Careers <ChevronRight size={14} className="ml-1" />
                </Button>
            </div>

            <div className="grid gap-4">
                {jobs.map((job) => (
                    <Card key={job._id} className="group overflow-hidden border-slate-200 transition-all duration-300 hover:border-blue-400 hover:shadow-md bg-white rounded-xl">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center p-5 md:p-6 gap-6">
                                
                                {/* Job Main Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                                                {job.title}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 text-sm">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <MapPin size={14} className="text-slate-400" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <DollarSign size={14} className="text-slate-400" />
                                                {job.salary}
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <Clock size={14} className="text-slate-400" />
                                                {/* Uses fallback if toISOString fails */}
                                                {job.createdAt ? `Posted ${formatDistanceToNow(new Date(job.createdAt))} ago` : 'Recently posted'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Skills as subtle tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.skills.map((skill, i) => (
                                            <Badge 
                                                key={i} 
                                                variant="secondary" 
                                                className="bg-slate-50 text-slate-500 border-slate-100 font-medium text-[11px] px-2 py-0.5 rounded-md"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Area */}
                                <div className="flex items-center md:pl-6 md:border-l border-slate-100">
                                    <Button className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white font-medium px-6 py-5 rounded-lg transition-all active:scale-[0.98]">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {/* Mobile-only view all button */}
            <Button variant="outline" className="w-full md:hidden border-slate-200 text-slate-600">
                View All Jobs
            </Button>
        </section>
    );
};