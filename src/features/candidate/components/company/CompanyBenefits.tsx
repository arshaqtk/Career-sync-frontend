import React from 'react';
import { Award } from 'lucide-react';
import { Button } from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";

interface CompanyBenefitsProps {
    benefits: string[];
}

export const CompanyBenefits: React.FC<CompanyBenefitsProps> = ({ benefits }) => {
    return (
        <Card className="bg-slate-900 rounded-[2.5rem] p-6 shadow-[0_40px_80px_-15px_rgba(15,23,42,0.4)] border-none text-white overflow-hidden relative group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/30 rounded-full blur-[90px] group-hover:bg-blue-500/50 transition-all duration-700" />
            <div className="relative z-10 p-4 font-black">
                <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                    <Award size={28} className="text-blue-400" />
                    Perks & Benefits
                </h3>
                <ul className="space-y-6">
                    {benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-5 group/li">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0 group-hover/li:scale-[2] transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                            <span className="text-slate-300 font-bold text-lg leading-tight group-hover/li:text-white transition-colors">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <Button className="w-full mt-12 bg-blue-600 hover:bg-white text-white hover:text-slate-900 border-none rounded-3xl font-black py-8 text-xl transition-all shadow-2xl active:scale-95">
                    Explore Culture
                </Button>
            </div>
        </Card>
    );
};
