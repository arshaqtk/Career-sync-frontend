
import { Button } from "@/components/ui/shadcn/button"
import { Badge } from "@/components/ui/shadcn/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import {CheckCircle2, Target, Users, Shield, Search,
    Globe, Rocket, Heart, ChevronRight, Briefcase,
    Building2, Layers, Cpu
} from "lucide-react"
import { Navbar } from "../components/layouts/NavBar"
import { Footer } from "../components/layouts/Footer"

export function AboutPage() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            <Navbar />
            <main className="flex-1">

                {/* 1. Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-muted/20">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/20 text-primary bg-primary/5">
                            About CareerSync
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Connecting Talent with the <br className="hidden md:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                Right Opportunities
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            CareerSync is a modern hiring platform designed to simplify job discovery and streamline recruitment for employers.
                        </p>
                    </div>
                </section>

                {/* 2. Who We Are */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight">Who We Are</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    CareerSync is built to solve real problems in today’s hiring process—inefficient job searches, irrelevant applications, and slow recruitment cycles.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We focus on building reliable tools that help candidates and employers connect more effectively.
                                </p>
                            </div>
                            <div className="bg-muted rounded-2xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                                <div className="relative z-10 space-y-8">
                                    <div>
                                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                                            <Target className="w-5 h-5 text-primary" /> Mission
                                        </h3>
                                        <p className="text-muted-foreground">
                                            To make job searching and hiring simple, transparent, and efficient for everyone.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                                            <Globe className="w-5 h-5 text-primary" /> Vision
                                        </h3>
                                        <p className="text-muted-foreground">
                                            To become a trusted platform where careers and companies grow together.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Problems We Solve */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Problems We Solve</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We address the friction points that make hiring painful for both sides.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Candidates */}
                            <Card className="border-border/50 shadow-sm">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <CardTitle>For Candidates</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        "Too many irrelevant job listings",
                                        "Hard-to-track applications",
                                        "Limited visibility into employer credibility"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-1 rounded-full text-red-600 dark:text-red-400">
                                                <Layers className="w-3 h-3" />
                                            </div>
                                            <span className="text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Employers */}
                            <Card className="border-border/50 shadow-sm">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <CardTitle>For Employers</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        "High volume of unqualified applications",
                                        "Manual screening overhead",
                                        "Delayed hiring decisions"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-1 rounded-full text-red-600 dark:text-red-400">
                                                <Layers className="w-3 h-3" />
                                            </div>
                                            <span className="text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 5. How CareerSync Works */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tight text-center mb-16">How CareerSync Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { title: "Create Profile", desc: "Candidates create comprehensive profiles." },
                                { title: "Post Jobs", desc: "Employers post verified job listings." },
                                { title: "Apply Directly", desc: "Candidates apply directly to roles." },
                                { title: "Review & Hire", desc: "Employers review, shortlist, and communicate." }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:border-primary/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 font-bold text-primary">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-semibold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Badge variant="secondary" className="px-4 py-2 text-base">
                                Result: Faster, organized hiring
                            </Badge>
                        </div>
                    </div>
                </section>

                {/* 6. What Makes Us Different */}
                <section className="py-20 bg-slate-950 text-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">What Makes CareerSync Different</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Layers, text: "Clean, easy-to-use interface" },
                                { icon: Shield, text: "Verified employers" },
                                { icon: Briefcase, text: "Structured job applications" },
                                { icon: Search, text: "Organized application tracking" },
                                { icon: Users, text: "Direct candidate–employer communication" },
                                { icon: Rocket, text: "Built with scalability in mind" },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <feature.icon className="w-6 h-6 text-blue-400" />
                                    <span className="font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Trust, Safety & Transparency */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-12">
                            <h2 className="text-3xl font-bold tracking-tight">Trust, Safety & Transparency</h2>
                            <div className="grid sm:grid-cols-2 gap-6 text-left">
                                {[
                                    "Employer verification before job posting",
                                    "Clear job descriptions",
                                    "Secure authentication",
                                    "User data privacy",
                                    "No fake or spam listings",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Technology & 9. Roadmap */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Built with Modern Tech</h2>
                            <p className="text-muted-foreground mb-8">
                                CareerSync is built using modern web technologies to ensure performance, security, and scalability.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Modern frontend architecture",
                                    "Secure backend APIs",
                                    "Real-time updates (notifications)",
                                    "Mobile-responsive design"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Cpu className="w-5 h-5 text-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Growth & Roadmap</h2>
                            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
                                <p className="text-lg text-muted-foreground italic mb-6">
                                    "We are continuously improving CareerSync and plan to introduce intelligent recommendations, advanced search, and automation features in future updates."
                                </p>
                                <div className="flex items-center gap-4 text-sm font-medium text-primary">
                                    <Rocket className="w-4 h-4" />
                                    <span>Innovation First Approach</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. Audience & 11. Values */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-16">

                            {/* Audience */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Who CareerSync Is For</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2 text-primary">Candidates</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {["Freshers", "Working professionals", "Career switchers"].map(tag => (
                                                <Badge key={tag} variant="secondary">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2 text-primary">Employers</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {["Startups", "Small & mid-sized companies", "Growing teams"].map(tag => (
                                                <Badge key={tag} variant="secondary">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Core Values */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Core Values</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Transparency", icon: Search },
                                        { title: "Reliability", icon: Shield },
                                        { title: "User-first design", icon: Heart },
                                        { title: "Continuous improvement", icon: Rocket },
                                        { title: "Fair opportunities", icon: Users },
                                    ].map((val, i) => (
                                        <div key={i} className="flex flex-col p-4 bg-muted/50 rounded-lg">
                                            <val.icon className="w-6 h-6 text-primary mb-2" />
                                            <span className="font-medium">{val.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 12. Final CTA */}
                <section className="py-24 bg-primary text-primary-foreground text-center">
                    <div className="container mx-auto px-4 md:px-6 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Start your journey with CareerSync today.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 h-12 text-lg font-semibold">
                                Find Jobs <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-12 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                Post a Job
                            </Button>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}
