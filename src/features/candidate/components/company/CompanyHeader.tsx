import React from 'react';
import { Building2, MapPin, Globe, Mail } from 'lucide-react';
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";

interface CompanyHeaderProps {
    companyData: {
        name: string;
        logo: string;
        industry: string;
        location: string;
        website: string;
        bannerImage: string;
    };
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyData }) => {
    return (
        <div className="relative bg-white rounded-[1.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/20">
            {/* Content Section - Compact Layout */}
            <div className="relative px-6 py-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Logo Section - Smaller Scale */}
                    <div className="relative shrink-0">
                        <div className="p-0.5 rounded-[1.2rem] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
                            <div className="bg-white p-2 rounded-[1.1rem] w-24 h-24 md:w-28 md:h-28 flex items-center justify-center overflow-hidden">
                                <img
                                    src={companyData.logo}
                                    alt={companyData.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Header Details - Unified Alignment */}
                    <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end gap-5">
                        <div className="space-y-3 text-center md:text-left">
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                    <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                                        {companyData.name}
                                    </h1>
                                    <Badge variant="secondary" className="bg-blue-600 text-white border-none font-black px-1.5 py-0.5 rounded-full text-[8px] uppercase tracking-wider">
                                        Verified
                                    </Badge>
                                </div>
                                <p className="text-blue-600 font-bold text-sm flex items-center justify-center md:justify-start gap-1.5">
                                    <Building2 size={14} className="stroke-[2.5px]" />
                                    {companyData.industry}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-slate-500 font-bold text-[11px]">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-full border border-slate-100">
                                    <MapPin size={12} className="text-slate-400" />
                                    {companyData.location}
                                </div>
                                <a
                                    href={companyData.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-all px-2.5 py-1 hover:bg-blue-50 rounded-full border border-transparent hover:border-blue-100"
                                >
                                    <Globe size={12} />
                                    {companyData.website.replace('https://', '')}
                                </a>
                            </div>
                        </div>

                        {/* Actions - Smaller Buttons */}
                        <div className="flex gap-2 w-full md:w-auto shrink-0">
                            <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-black h-10 px-6 rounded-xl shadow-md shadow-blue-200 transition-all active:scale-95 text-xs">
                                Follow
                            </Button>
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all active:scale-95">
                                <Mail size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
