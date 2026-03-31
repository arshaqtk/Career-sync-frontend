import React from 'react';
import { Users, Calendar, MapPin, Briefcase, Linkedin, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/shadcn/badge";
import { Separator } from "@/components/ui/shadcn/separator";

interface CompanyQuickStatsProps {
    employees: string;
    founded: string;
    location: string;
    industry: string;
    specialties: string[];
    website:string;
}

export const CompanyQuickStats: React.FC<CompanyQuickStatsProps> = ({
    employees,
    founded,
    location,
    industry,
    specialties,
    website
}) => {
    return (
        <section className="bg-card rounded-2xl p-8 border border-border shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_15px_-3px_rgba(255,255,255,0.02),0_10px_20px_-2px_rgba(255,255,255,0.01)] transition-colors duration-300">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    Corporate Overview
                </h3>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Active" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-y-6">
                {[
                    { label: "Headcount", value: employees, icon: Users, color: "text-primary" },
                    { label: "Established", value: founded, icon: Calendar, color: "text-muted-foreground" },
                    { label: "Headquarters", value: location, icon: MapPin, color: "text-muted-foreground" },
                    { label: "Sector", value: industry, icon: Briefcase, color: "text-muted-foreground" },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center group transition-all">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center border border-border/50 group-hover:bg-card group-hover:border-border transition-colors">
                            <item.icon size={18} className="text-muted-foreground" />
                        </div>
                        <div className="ml-4">
                            <p className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wider">{item.label}</p>
                            <p className="text-sm font-semibold text-foreground">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator className="my-8 bg-border" />

            {/* Expertise Section */}
            <div className="space-y-4">
                <p className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wider">Core Competencies</p>
                <div className="flex flex-wrap gap-1.5">
                    {specialties.map((spec, i) => (
                        <Badge 
                            key={i} 
                            variant="secondary" 
                            className="bg-muted/80 hover:bg-muted text-foreground/80 border-transparent px-3 py-1 text-[11px] font-medium transition-colors"
                        >
                            {spec}
                        </Badge>
                    ))}
                </div>
            </div>

            <Separator className="my-8 bg-border" />

            {/* Professional Footer Links */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {[Linkedin, Twitter, Instagram, Mail].map((Icon, i) => (
                        <a 
                            key={i}
                            href="#" 
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
                <a href={website}
                target="_blank"
                rel="noopener noreferrer"
                >
                <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                    Visit Site <ExternalLink size={12}/>
                </button>
                </a>
            </div>
        </section>
    );
};