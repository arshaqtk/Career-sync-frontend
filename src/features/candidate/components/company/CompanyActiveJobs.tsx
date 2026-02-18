import React from 'react';
import { MapPin, Briefcase, Clock, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";

interface Job {
    id: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    skills: string[];
}

interface CompanyActiveJobsProps {
    jobs: Job[];
}

export const CompanyActiveJobs: React.FC<CompanyActiveJobsProps> = ({ jobs }) => {
    return (
        <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        Opportunities
                        <span className="text-blue-600">({jobs.length})</span>
                    </h2>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">Join our mission-driven team</p>
                </div>
                <Button variant="ghost" className="text-blue-600 font-extrabold hover:bg-blue-50 hover:text-blue-700 rounded-xl px-4 h-9 flex items-center gap-1.5 group transition-all border border-transparent hover:border-blue-100 text-xs">
                    View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid gap-6">
                {jobs.map((job) => (
                    <Card key={job.id} className="group relative overflow-hidden hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/10 bg-white border-slate-100 rounded-[1.25rem]">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-stretch">
                                {/* Left Accent */}
                                <div className="hidden md:block w-1.5 bg-slate-900 group-hover:bg-blue-600 transition-colors" />

                                <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 text-slate-500 font-bold text-xs">
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                                                    <MapPin size={12} className="text-slate-400" />
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                                                    <Briefcase size={12} className="text-slate-400" />
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, i) => (
                                                <Badge key={i} variant="secondary" className="bg-white text-slate-600 border border-slate-200 font-bold text-[10px] px-2.5 py-0.5 rounded-lg group-hover:border-blue-200 transition-colors capitalize">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end gap-5 text-right border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-8">
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Expected Salary</p>
                                            <p className="text-xl font-black text-slate-900">{job.salary}</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter flex items-center gap-1.5 order-2 md:order-1">
                                                <Clock size={12} className="text-slate-300" />
                                                Posted {job.posted}
                                            </span>
                                            <Button className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white font-black px-8 h-10 rounded-xl transition-all shadow-md shadow-slate-200 hover:shadow-blue-200 order-1 md:order-2 active:scale-95 text-sm">
                                                Apply Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
