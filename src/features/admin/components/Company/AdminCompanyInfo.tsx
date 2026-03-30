import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Globe, Users, Calendar, Info } from "lucide-react"

interface AdminCompanyInfoProps {
    company: {
        description?: string
        website?: string
        size?: string
        foundedYear?: number
    }
}

export function AdminCompanyInfo({ company }: AdminCompanyInfoProps) {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-3xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-3 text-white">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                            <Info className="h-5 w-5" />
                        </div>
                        About Company
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {company.description || "No description provided."}
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-3xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-3 text-white">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                            <Globe className="h-5 w-5" />
                        </div>
                        Quick Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                        <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 shadow-lg">
                            <Globe className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Website</p>
                            {company?.website ? (
                                <a href={company?.website} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                    {company?.website}
                                </a>
                            ) : (
                                <p className="text-sm text-slate-500 italic">Not provided</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                        <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 shadow-lg">
                            <Users className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Company Size</p>
                            <p className="text-sm font-bold text-white">{company?.size || "Unknown"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                        <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 shadow-lg">
                            <Calendar className="h-5 w-5 text-orange-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Founded Year</p>
                            <p className="text-sm font-bold text-white">{company?.foundedYear || "Not specified"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
