import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { CompanySearch } from "../components/onboarding/CompanySearch";
import { CreateCompanyForm } from "../components/onboarding/CreateCompanyForm";

export default function RecruiterCompanyOnboardingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome to CareerSync Recruiter
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        To get started, please join an existing company or create a new one.
                    </p>
                </div>

                <Tabs defaultValue="join" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="join">Join Existing Company</TabsTrigger>
                        <TabsTrigger value="create">Create New Company</TabsTrigger>
                    </TabsList>

                    <TabsContent value="join">
                        <CompanySearch />
                    </TabsContent>

                    <TabsContent value="create">
                        <CreateCompanyForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
