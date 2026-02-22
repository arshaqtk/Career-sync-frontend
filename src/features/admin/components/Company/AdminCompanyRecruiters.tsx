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
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-blue-600" /> Associated Recruiters
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Owner Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Company Owner</h3>
                        <div className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    {owner.profilePictureUrl ? (
                                        <img src={owner.profilePictureUrl} alt={owner.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {owner.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{owner.name}</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Mail className="h-3 w-3" /> {owner.email}
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to={`/admin/recruiters/${owner._id}`}>
                                    View Profile <ExternalLink className="ml-2 h-3.3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* All Recruiters */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">All Team Members ({recruiters.length})</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {recruiters.map((rec) => (
                                <div key={rec._id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full overflow-hidden border">
                                            {rec.profilePictureUrl ? (
                                                <img src={rec.profilePictureUrl} alt={rec.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                                                    {rec.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 line-clamp-1">{rec.name}</p>
                                            <p className="text-xs text-slate-500 line-clamp-1">{rec.email}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
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
