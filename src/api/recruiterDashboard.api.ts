import {type RecruiterDashboardResponse } from "@/features/recruiter/types/dashboard.types"
import api from "./apiClient"

export const fetchRecruiterDashboardApi =
  async (): Promise<RecruiterDashboardResponse> => {
    const res = await api.get("/recruiter/dashboard")
    return res.data.data
  }