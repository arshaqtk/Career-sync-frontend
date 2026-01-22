import { Briefcase } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Briefcase className="h-6 w-6" />
                            <span>CareerSync</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Connecting top talent with world-class employers through AI-driven matching.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">For Talent</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Browse Jobs</a></li>
                            <li><a href="#" className="hover:text-primary">Career Advice</a></li>
                            <li><a href="#" className="hover:text-primary">Resume Builder</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">For Employers</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Post a Job</a></li>
                            <li><a href="#" className="hover:text-primary">Talent Solutions</a></li>
                            <li><a href="#" className="hover:text-primary">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">About Us</a></li>
                            <li><a href="#" className="hover:text-primary">Careers</a></li>
                            <li><a href="#" className="hover:text-primary">Contact</a></li>
                            <li><a href="#" className="hover:text-primary">Legal</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CareerSync. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
