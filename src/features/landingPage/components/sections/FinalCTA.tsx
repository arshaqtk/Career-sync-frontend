import { Button } from "@/components/ui/shadcn/button"

export function FinalCTA() {
    return (
        <section className="py-24 bg-slate-950 text-white text-center">
            <div className="container mx-auto px-4 md:px-6 space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Your Career Starts Here.
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Join thousands of professionals who have found their dream jobs with CareerSync. No credit card required to start.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-lg">
                        Join Now – It’s Free
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-12 text-lg bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                        Talk to Sales
                    </Button>
                </div>
            </div>
        </section>
    )
}
