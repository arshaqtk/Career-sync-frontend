import type { ApiResponse, ICompany } from "@/features/recruiter/types/company.types";
import api from "./apiClient"
import type { Job } from "@/features/recruiter/types/job.type";


export const getCompanyByIdApi = async (companyId: string): Promise<ApiResponse<ICompany>> => {
    const res = await api.get(`/companies/${companyId}`);
    return res.data;
};

export const getCompanyJobsApi = async (companyId: string): Promise<ApiResponse<Job[]>> => {
    const res = await api.get(`/companies/${companyId}/jobs`);
    return res.data.data;
};