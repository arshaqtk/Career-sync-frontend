import { Button } from "@/components/ui/shadcn/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function PromoCards() {
    const navigate=useNavigate()
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg group">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-3xl font-bold tracking-tight">Elevate your career to the next level.</h3>
                            <p className="text-blue-100 max-w-sm">
                                Get access to exclusive job listings and premium career tools designed to fast-track your success.
                            </p>
                            <Button onClick={()=>navigate("/auth/login")} variant="secondary" size="lg" className="mt-4 gap-2">
                                Find Work <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-8 -mb-8"></div>
                    </div>

                    <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-lg">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-3xl font-bold tracking-tight">Hire the top 1% of tech & business talent.</h3>
                            <p className="text-slate-300 max-w-sm">
                                Streamline your hiring process with our AI-vetted candidate pools. Quality over quantity, always.
                            </p>
                            <Button onClick={()=>navigate("/auth/login")} variant="outline" size="lg" className="mt-4 gap-2 bg-transparent text-white hover:bg-white hover:text-black border-white/40">
                                Post a Job <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                        {/* Abstract Background Shapes */}
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                    </div>

                </div>
            </div>
        </section>
    )
}
