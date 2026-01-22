import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/shadcn/card"
import { Zap, Bell, ShieldCheck } from "lucide-react"

export function WhyCareerSync() {
    return (
        <section id="features" className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Why Choose CareerSync?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We don't just list jobs. We engineer careers with cutting-edge technology designed to put you ahead of the competition.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="border-primary/20 shadow-lg relative overflow-hidden group hover:border-primary transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-24 h-24 text-primary" />
                        </div>
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle>Smart AI Matching</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base text-muted-foreground/90">
                                Our algorithm analyzes your skills and preferences to find opportunities that fit you perfectly, filtering out the noise.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground shadow-xl scale-105 border-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Bell className="w-24 h-24 text-white" />
                        </div>
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4 text-white">
                                <Bell className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-white">Instant Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base text-primary-foreground/90">
                                Be the first to apply. Get real-time notifications when a relevant job drops. Speed is your competitive advantage.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 shadow-lg relative overflow-hidden group hover:border-primary transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck className="w-24 h-24 text-primary" />
                        </div>
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle>Verified Employers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base text-muted-foreground/90">
                                No more scams or ghost jobs. We vet every company so you can apply with peace of mind and confidence.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
