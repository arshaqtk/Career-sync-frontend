import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Users as UsersIcon, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/shadcn/button"
import { Link } from "react-router-dom"

interface Recruiter {
    _id: string
    name: string
    email: string
    profilePictureUrl?: string
}

interface AdminCompanyRecruitersProps {
    owner: Recruiter
    recruiters: Recruiter[]
}

export function AdminCompanyRecruiters({ owner, recruiters }: AdminCompanyRecruitersProps) {
    return (
        <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-3xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-white/5">
                <CardTitle className="text-xl flex items-center gap-3 text-white">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                        <UsersIcon className="h-5 w-5" />
                    </div>
                    Associated Recruiters
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
                <div className="space-y-10">
                    {/* Owner Section */}
                    <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <h3 className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-[0.2em] pl-2">Company Owner</h3>
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl shadow-xl shadow-blue-500/5 group">
                            <div className="flex items-center gap-5">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl relative">
                                    {owner?.profilePictureUrl ? (
                                        <img src={owner?.profilePictureUrl} alt={owner?.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                    ) : (
                                        <div className="h-full w-full bg-slate-800 flex items-center justify-center text-blue-400 text-xl font-bold">
                                            {owner?.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{owner?.name}</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                                        <div className="p-1 rounded-md bg-white/5">
                                            <Mail className="h-3 w-3" />
                                        </div>
                                        {owner?.email}
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" asChild className="rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all active:scale-95">
                                <Link to={`/admin/recruiters/${owner?._id}`}>
                                    View Profile <ExternalLink className="ml-2 h-3.3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* All Recruiters */}
                    <div>
                        <h3 className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-[0.2em]">All Team Members ({recruiters.length})</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {recruiters.map((rec) => (
                                <div key={rec._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10 shadow-lg relative">
                                            {rec.profilePictureUrl ? (
                                                <img src={rec.profilePictureUrl} alt={rec.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                            ) : (
                                                <div className="h-full w-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                                                    {rec.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{rec.name}</p>
                                            <p className="text-[10px] text-slate-500 truncate mt-0.5">{rec.email}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all" asChild>
                                        <Link to={`/admin/recruiters/${rec._id}`}>
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
