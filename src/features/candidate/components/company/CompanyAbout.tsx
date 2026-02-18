import React from 'react';

interface CompanyAboutProps {
    name: string;
    description: string;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = ({ name, description }) => {
    return (
        <section className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/30 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600/10 group-hover:bg-blue-600 transition-colors duration-500" />
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                About {name}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-bold text-sm md:text-base">
                {description.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-3 last:mb-0 transition-all duration-300 group-hover:text-slate-800 selection:bg-blue-100">{para}</p>
                ))}
            </div>
        </section>
    );
};
