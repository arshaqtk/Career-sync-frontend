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
}

export const CompanyQuickStats: React.FC<CompanyQuickStatsProps> = ({
    employees,
    founded,
    location,
    industry,
    specialties
}) => {
    return (
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-slate-800 tracking-tight">
                    Corporate Overview
                </h3>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Active" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-y-6">
                {[
                    { label: "Headcount", value: employees, icon: Users, color: "text-blue-600" },
                    { label: "Established", value: founded, icon: Calendar, color: "text-slate-600" },
                    { label: "Headquarters", value: location, icon: MapPin, color: "text-slate-600" },
                    { label: "Sector", value: industry, icon: Briefcase, color: "text-slate-600" },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center group transition-all">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                            <item.icon size={18} className="text-slate-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{item.label}</p>
                            <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator className="my-8 bg-slate-100" />

            {/* Expertise Section */}
            <div className="space-y-4">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Core Competencies</p>
                <div className="flex flex-wrap gap-1.5">
                    {specialties.map((spec, i) => (
                        <Badge 
                            key={i} 
                            variant="secondary" 
                            className="bg-slate-100/80 hover:bg-slate-200 text-slate-600 border-transparent px-3 py-1 text-[11px] font-medium transition-colors"
                        >
                            {spec}
                        </Badge>
                    ))}
                </div>
            </div>

            <Separator className="my-8 bg-slate-100" />

            {/* Professional Footer Links */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {[Linkedin, Twitter, Instagram, Mail].map((Icon, i) => (
                        <a 
                            key={i}
                            href="#" 
                            className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
                <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline">
                    Visit Site <ExternalLink size={12} />
                </button>
            </div>
        </section>
    );
};