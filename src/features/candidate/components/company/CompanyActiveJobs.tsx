import { MapPin, Clock, ChevronRight, DollarSign } from 'lucide-react';
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { Job } from '@/features/recruiter/types/job.type';
import { formatDistanceToNow } from 'date-fns'; 
import { useNavigate } from 'react-router-dom';

export const CompanyActiveJobs = ({ jobs }: { jobs: Job[] }) => {
    const navigate = useNavigate();
    
    return (
        <section className="space-y-6">
            {/* Header with cleaner typography */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <div>
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
                        Open Roles
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-2.5">
                            {jobs?.length}
                        </Badge>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Explore current opportunities to join our team</p>
                </div>
                <Button variant="outline" size="sm" className="hidden md:flex text-muted-foreground font-medium border-border hover:bg-muted transition-colors">
                    View All Careers <ChevronRight size={14} className="ml-1" />
                </Button>
            </div>

            <div className="grid gap-4">
                {jobs?.map((job) => (
                    <Card key={job._id} className="group overflow-hidden border-border transition-all duration-300 hover:border-primary/50 hover:shadow-md bg-card rounded-xl">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center p-5 md:p-6 gap-6">
                                
                                {/* Job Main Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                                                {job.title}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <MapPin size={14} className="text-muted-foreground/70" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <DollarSign size={14} className="text-muted-foreground/70" />
                                                {job.salary}
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <Clock size={14} className="text-muted-foreground/70" />
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
                                                className="bg-muted/50 text-muted-foreground border-border/50 font-medium text-[11px] px-2 py-0.5 rounded-md"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Area */}
                                <div className="flex items-center md:pl-6 md:border-l border-border/50">
                                    <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-5 rounded-lg transition-all active:scale-[0.98]"
                                    onClick={() => navigate(`/jobs?id=${job._id}`)}>
                                       View Job
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {/* Mobile-only view all button */}
            <Button variant="outline" className="w-full md:hidden border-border text-muted-foreground">
                View All Jobs
            </Button>
        </section>
    );
};