import { recruiterGetInterviewDetailApi } from "@/api/interview.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useQuery } from "@tanstack/react-query"


export function useRecruiterInterviewDetail(id:string){
    return useQuery({
        queryKey:QUERY_KEYS.interviews.detail(id),
        queryFn:()=>recruiterGetInterviewDetailApi(id),
        staleTime:1000*60*5,
    })
}