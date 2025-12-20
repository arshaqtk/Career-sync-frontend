import { recruiterGetInterviewDetailApi } from "@/api/interview.api"
import { useQuery } from "@tanstack/react-query"


export function useRecruiterInterviewDetail(id:string){
    return useQuery({
        queryKey:["interview-details",id],
        queryFn:()=>recruiterGetInterviewDetailApi(id),
        staleTime:1000*60*5,
    })
}