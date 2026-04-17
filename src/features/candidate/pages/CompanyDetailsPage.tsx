import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Building2 } from 'lucide-react';
import { CompanyHeader } from '../components/company/CompanyHeader';
import { CompanyAbout } from '../components/company/CompanyAbout';
import { CompanyActiveJobs } from '../components/company/CompanyActiveJobs';
import { CompanyQuickStats } from '../components/company/CompanyQuickStats';
import { Button } from "@/components/ui/shadcn/button";
import { useCompanyDetails, useCompanyJobDetails } from '@/features/recruiter/hooks/useCompanyOnboarding';
import CareerSyncLogo from "@/shared/logo/careerSync.logo";

export default function CompanyDetailsPage() {
    const { companyId } = useParams<{ companyId: string }>();
    const navigate = useNavigate();

    const { data: response, isLoading, error } = useCompanyDetails(companyId || "");
    const {data:jobs,isLoading:jobsLoading}=useCompanyJobDetails(companyId ||"")
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [companyId]);

    if (isLoading || jobsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground font-bold animate-pulse">Loading Company Profile...</p>
                </div>
            </div>
        );
    }

    if (error || !response?.data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
                <div className="p-6 bg-destructive/10 rounded-full">
                    <Building2 size={48} className="text-destructive" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-foreground">Company Not Found</h2>
                    <p className="text-muted-foreground font-medium max-w-md">
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

 const headerData = {
    name: company.name,
    logo: company.logo?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${company.name}`,
    industry: company.industry || '-',
    location: company.location || '-',
    website: company.website || '#',
    // bannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c"
};

    const statsData = {
        employees: company.size || 'Not Specified',
        founded: company.foundedYear?.toString() || 'Established',
        location: company.location || 'Not Specified',
        industry: company.industry || 'Not Specified',
        specialties: [company.industry || 'Not Specified']
    };

   

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 px-4 md:px-8">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pt-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 font-black text-muted-foreground/80 hover:text-primary hover:bg-primary/10 rounded-2xl px-5 py-6 transition-all border border-transparent hover:border-primary/20"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform stroke-[3px]" />
                    BACK
                </Button>

                <div className="hidden md:flex items-center gap-2 text-muted-foreground font-bold text-xs tracking-widest uppercase">
                    <CareerSyncLogo showText={false} className="h-4" />
                    <span className="text-border">/</span>
                    <span className="text-primary">Company Profile</span>
                </div>
            </div>

            <CompanyHeader companyData={headerData} />

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-16">
                    <CompanyAbout name={company.name} description={company.description || "No description provided yet."} />
                  {jobs && <CompanyActiveJobs jobs={jobs.data} />}
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
                            website={headerData.website}
                        />
                        {/* <CompanyBenefits benefits={benefits} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
