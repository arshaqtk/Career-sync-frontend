import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import { Search, MapPin } from "lucide-react"

export function Hero() {
    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
                    Find the Right Job. <br className="hidden md:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        Faster. Smarter.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                    Unlock your potential with our AI-driven career matching platform.
                    Connect with top employers and land your dream job in record time.
                </p>

                <div className="w-full max-w-3xl p-4 bg-card rounded-2xl shadow-lg border border-border/50 flex flex-col md:flex-row gap-4 mt-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Job title, keywords, or company"
                            className="pl-10 h-12 border-0 bg-secondary/50 focus-visible:ring-0 focus-visible:bg-background transition-colors"
                        />
                    </div>
                    <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Location or 'Remote'"
                            className="pl-10 h-12 border-0 bg-secondary/50 focus-visible:ring-0 focus-visible:bg-background transition-colors"
                        />
                    </div>
                    <Button size="lg" className="h-12 px-8 text-lg font-medium shadow-md">
                        Find Jobs
                    </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                    <span>Popular:</span>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {["Remote", "Software Engineer", "Product Manager", "Designer"].map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium cursor-pointer hover:bg-secondary/80 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
