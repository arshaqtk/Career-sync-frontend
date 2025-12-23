import { recruiterGetApplicationInterviewTimeLineApi } from "@/api/interview.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useQuery } from "@tanstack/react-query"


export function useRecruiterInterviewTimeline(applicationId:string){
    return useQuery({
        queryKey:QUERY_KEYS.interviews.listByApplication(applicationId),
        queryFn:()=>recruiterGetApplicationInterviewTimeLineApi({applicationId}),
          enabled: !!applicationId, 
        staleTime:1000*60*5,
    })
}