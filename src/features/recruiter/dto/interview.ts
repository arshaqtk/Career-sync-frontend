import type { InterviewStatus } from "../types/interview.type"

export type UpdateStatusPayloadDto={
    status:InterviewStatus,
    notes?:string
    roundNumber:number
}