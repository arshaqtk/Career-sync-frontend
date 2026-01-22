import { UserPlus, Sparkles, Briefcase } from "lucide-react"

export function HowItWorks() {
    const steps = [
        {
            icon: UserPlus,
            title: "Create Profile",
            desc: "Sign up and build your professional profile in minutes.",
        },
        {
            icon: Sparkles,
            title: "Get Matched",
            desc: "Our AI connects you with jobs that match your skills.",
        },
        {
            icon: Briefcase,
            title: "Land the Job",
            desc: "Apply with one click and get hired by top companies.",
        },
    ]

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        How It Works
                    </h2>
                    <p className="text-muted-foreground">
                        Your path to your next career move is just 3 steps away.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-border -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-background border-4 border-muted group-hover:border-primary transition-colors flex items-center justify-center mb-6 z-10 shadow-sm">
                                <step.icon className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground max-w-[250px]">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
