import React from 'react';
import { Users, Calendar, MapPin, Award, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
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
        <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <h3 className="text-2xl font-black text-slate-900 mb-10">
                Company Info
            </h3>

            <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6 shadow-sm border border-blue-100/50">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Team Size</p>
                        <p className="text-slate-900 font-black text-xl">{employees}</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6 shadow-sm border border-orange-100/50">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Founded</p>
                        <p className="text-slate-900 font-black text-xl">{founded}</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6 shadow-sm border border-emerald-100/50">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">HQ Location</p>
                        <p className="text-slate-900 font-black text-xl">{location}</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6 shadow-sm border border-purple-100/50">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Job Field</p>
                        <p className="text-slate-900 font-black text-xl">{industry}</p>
                    </div>
                </div>
            </div>

            <Separator className="my-10 bg-slate-100" />

            <div className="space-y-6">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1 px-1">Expertise</p>
                <div className="flex flex-wrap gap-2.5">
                    {specialties.map((spec, i) => (
                        <Badge key={i} variant="outline" className="border-slate-100 bg-slate-50/50 text-slate-500 px-4 py-2 font-bold rounded-xl text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-500 cursor-default">
                            {spec}
                        </Badge>
                    ))}
                </div>
            </div>

            <Separator className="my-10 bg-slate-100" />

            <div className="flex justify-between items-center px-4">
                <a href="#" className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"><Linkedin size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-500 transition-all border border-transparent hover:border-sky-100"><Twitter size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-pink-50 hover:text-pink-600 transition-all border border-transparent hover:border-pink-100"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"><Mail size={20} /></a>
            </div>
        </section>
    );
};
