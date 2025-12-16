import { recruiterGetCandidateProfileApi } from "@/api/recruiter.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function useRecruiterFetchCandidateProfile(candidateId: string) {
    return useQuery({
        queryKey: QUERY_KEYS.recruiter.candidateProfile(candidateId),
        queryFn: () => recruiterGetCandidateProfileApi(candidateId),
        enabled: !!candidateId,
        staleTime: 1000 * 60 * 1,
    })
}