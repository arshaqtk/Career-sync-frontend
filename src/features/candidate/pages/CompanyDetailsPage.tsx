import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Building2 } from 'lucide-react';
import { CompanyHeader } from '../components/company/CompanyHeader';
import { CompanyAbout } from '../components/company/CompanyAbout';
import { CompanyActiveJobs } from '../components/company/CompanyActiveJobs';
import { CompanyQuickStats } from '../components/company/CompanyQuickStats';
import { CompanyBenefits } from '../components/company/CompanyBenefits';
import { Button } from "@/components/ui/shadcn/button";
import { useCompanyDetails } from '@/features/recruiter/hooks/useCompanyOnboarding';

export default function CompanyDetailsPage() {
    const { companyId } = useParams<{ companyId: string }>();
    const navigate = useNavigate();

    const { data: response, isLoading, error } = useCompanyDetails(companyId || "");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [companyId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                    <p className="text-slate-500 font-bold animate-pulse">Loading Company Profile...</p>
                </div>
            </div>
        );
    }

    if (error || !response?.data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
                <div className="p-6 bg-red-50 rounded-full">
                    <Building2 size={48} className="text-red-500" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-slate-900">Company Not Found</h2>
                    <p className="text-slate-500 font-medium max-w-md">
                        We couldn't find the company you're looking for. It might have been removed or the link is incorrect.
                    </p>
                </div>
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="rounded-xl font-bold px-8 py-6"
                >
                    Go Back
                </Button>
            </div>
        );
    }

    const company = response.data;

    // Adapt data for components
    const headerData = {
        name: company.name,
        logo: company.logo?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${company.name}&backgroundColor=0066ff&textColor=ffffff`,
        industry: company.industry || 'Global Enterprise',
        location: company.location || 'Remote',
        website: company.website || '#',
        bannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    };

    const statsData = {
        employees: company.size || 'Not Specified',
        founded: company.foundedYear?.toString() || 'Established',
        location: company.location || 'Main HQ',
        industry: company.industry || 'Industry Leader',
        specialties: [company.industry || 'Innovation', 'Technology', 'Growth']
    };

    // Dummy data for positions since backend doesn't have it yet or it's not in this API
    const dummyJobs = [
        {
            id: "1",
            title: "Senior Full Stack Engineer",
            location: company.location || "Remote",
            type: "Full-time",
            salary: "₹25L - ₹45L",
            posted: "2 days ago",
            skills: ["React", "Node.js", "TypeScript", "AWS"]
        },
        {
            id: "2",
            title: "Product Designer",
            location: company.location || "Bangalore",
            type: "Full-time",
            salary: "₹18L - ₹30L",
            posted: "5 days ago",
            skills: ["Figma", "UI/UX", "Product Strategy"]
        }
    ];

    const benefits = [
        "Competitive Compensation",
        "Comprehensive Health Care",
        "Flexible Working Hours",
        "Professional Development",
        "Modern Working Environment"
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 px-4 md:px-8">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pt-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 font-black text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-2xl px-5 py-6 transition-all border border-transparent hover:border-blue-100"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform stroke-[3px]" />
                    BACK
                </Button>

                <div className="hidden md:flex items-center gap-2 text-slate-300 font-bold text-xs tracking-widest uppercase">
                    <span>CareerSync</span>
                    <span className="text-slate-200">/</span>
                    <span className="text-blue-600">Company Profile</span>
                </div>
            </div>

            <CompanyHeader companyData={headerData} />

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-16">
                    <CompanyAbout name={company.name} description={company.description || "No description provided yet."} />
                    <CompanyActiveJobs jobs={dummyJobs} />
                </div>

                {/* Sticky Sidebar Area */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="sticky top-28 space-y-10">
                        <CompanyQuickStats
                            employees={statsData.employees}
                            founded={statsData.founded}
                            location={statsData.location}
                            industry={statsData.industry}
                            specialties={statsData.specialties}
                        />
                        <CompanyBenefits benefits={benefits} />
                    </div>
                </div>
            </div>
        </div>
    );
}
