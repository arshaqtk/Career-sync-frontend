import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table"
import { VerificationBadge, ActiveBadge } from "./CompanyBadges"
import { CompanyActions } from "./CompanyActions"

interface CompanyList {
    _id: string
    name: string
    industry: string
    location: string
    verificationStatus: "pending" | "approved" | "rejected"
    isActive: boolean
    owner: {
        _id: string
        name: string
        email: string
    }
}

export function CompanyTable({
    companies,
    onView,
    onApprove,
    onReject,
    onBlock,
    onUnblock,
}: {
    companies: CompanyList[]
    onView: (id: string) => void
    onApprove: (id: string) => void
    onReject: (id: string) => void
    onBlock: (id: string) => void
    onUnblock: (id: string) => void
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {companies.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                            No companies found
                        </TableCell>
                    </TableRow>
                ) : (
                    companies.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell className="font-medium">
                                <div>
                                    <div>{company.name}</div>
                                    <div className="text-xs text-muted-foreground">{company.location}</div>
                                </div>
                            </TableCell>
                            <TableCell>{company.industry}</TableCell>
                            <TableCell>
                                <div>
                                    <div className="text-sm">{company.owner.name}</div>
                                    <div className="text-xs text-muted-foreground">{company.owner.email}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <VerificationBadge status={company.verificationStatus} />
                            </TableCell>
                            <TableCell>
                                <ActiveBadge isActive={company.isActive} />
                            </TableCell>
                            <TableCell className="text-right">
                                <CompanyActions
                                    status={company.verificationStatus}
                                    isActive={company.isActive}
                                    onView={() => onView(company._id)}
                                    onApprove={() => onApprove(company._id)}
                                    onReject={() => onReject(company._id)}
                                    onBlock={() => onBlock(company._id)}
                                    onUnblock={() => onUnblock(company._id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
