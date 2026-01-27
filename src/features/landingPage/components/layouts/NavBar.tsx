import { Button } from "@/components/ui/shadcn/button"
import { Briefcase } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export function Navbar() {
    const navigate=useNavigate()
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Briefcase className="h-6 w-6" />
                    <span>CareerSync</span>
                </div>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link to="/jobs" className="hover:text-primary transition-colors">Find Jobs</Link>
                    <Link to="/" className="hover:text-primary transition-colors">For Employers</Link>
                    <Link to="/" className="hover:text-primary transition-colors">Resources</Link>
                    <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="hidden sm:inline-flex" 
                    onClick={()=>navigate("/auth/login")}>Login</Button>
                    <Button
                    onClick={()=>navigate("/auth/register")}>Get Started</Button>
                </div>
            </div>
        </nav>
    )
}
