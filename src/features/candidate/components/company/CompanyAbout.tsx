import React from 'react';
import { Info, Quote } from 'lucide-react';

interface CompanyAboutProps {
    name: string;
    description: string;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = ({ name, description }) => {
    return (
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Minimalist Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Info size={18} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
                    About {name}
                </h2>
            </div>

            {/* Typography focused content */}
            <div className="relative">
                {/* Decorative Quote Icon for a 'Leadership' feel */}
                <Quote 
                    className="absolute -top-2 -left-4 text-slate-50 opacity-50 pointer-events-none" 
                    size={60} 
                />
                
                <div className="relative z-10 space-y-4">
                    {description.split('\n\n').map((para, i) => (
                        <p 
                            key={i} 
                            className="text-slate-600 leading-relaxed text-[15px] font-normal selection:bg-blue-100"
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* Subtle bottom gradient/fade to smooth the end of the text */}
            <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.15em]">
                    Corporate Identity & Culture
                </p>
            </div>
        </section>
    );
};