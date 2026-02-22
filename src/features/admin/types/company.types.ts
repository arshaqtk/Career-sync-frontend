export interface ICompany {
    _id: string;
    name: string;
    website?: string;
    logo?: {
        key: string;
        url: string;
    };
    location?: string;
    description?: string;
    industry?: string;
    size?: string;
    foundedYear?: number;
    owner: string;
    recruiters: string[];
    verificationStatus: "pending" | "approved" | "rejected";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}