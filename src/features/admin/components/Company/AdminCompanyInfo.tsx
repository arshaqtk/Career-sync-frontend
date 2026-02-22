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
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" /> About Company
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {company.description || "No description provided."}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" /> Quick Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Globe className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Website</p>
                            {company.website ? (
                                <a href={company.website} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                                    {company.website}
                                </a>
                            ) : (
                                <p className="text-sm text-slate-500 italic">Not provided</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Company Size</p>
                            <p className="text-sm font-medium">{company.size || "Unknown"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Founded Year</p>
                            <p className="text-sm font-medium">{company.foundedYear || "Not specified"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
