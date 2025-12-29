import api from "./apiClient"


export interface ListFilters  {
  page?: number
  limit?: number
  status?: "active" | "blocked" | "closed" | "all"
  search?: string
}



export const getRecruitersListApi = async ({
  page,
  limit,
  status,
  search,
}: ListFilters) => {
  const res = await api.get("/admin/recruiters", {
    params: {
      page,
      limit,
      status,
      search,
    },
  })

  return res.data
}

export const getRecruiterDetailApi = async (id: string) => {
  const res = await api.get(`/admin/recruiters/${id}`)
  console.log(res.data)
  return res.data
}

export const blockRecruiterApi = async (id: string,reason:string) => {
  const res = await api.patch(`/admin/recruiters/${id}/block`,{reason})
  return res.data
}

export const unblockRecruiterApi = async (id: string) => {
  const res = await api.patch(`/admin/recruiters/${id}/unblock`)
  return res.data
}


export const getCandidatesListApi = async ({
  page,
  limit,
  status,
  search,
}: ListFilters) => {
  const res = await api.get("/admin/candidates", {
    params: {
      page,
      limit,
      status,
      search,
    },
  })

  return res.data
}
export const getCandidateDetailApi = async (id: string) => {
  const res = await api.get(`/admin/candidates/${id}`)
  console.log(res.data)
  return res.data
}

export const blockCandidateApi = async (id: string,reason:string) => {
  const res = await api.patch(`/admin/candidates/${id}/block`,{reason})
  return res.data
}

export const unblockCandidateApi = async (id: string) => {
  const res = await api.patch(`/admin/candidates/${id}/unblock`)
  return res.data
}



export const AdmingetJobsListApi = async (params:ListFilters) => {
  const res = await api.get("/admin/jobs",{params})
  return res.data
}

export const AdmingetJobDetailApi = async (id: string) => {
  const res = await api.get(`/admin/jobs/${id}`)
  console.log(res.data)
  return res.data
}



export const blockJobApi = async (id: string,reason:string) => {
  const res = await api.patch(`/admin/jobs/${id}/block`,{reason})
  return res.data
}

export const unblockJobApi = async (id: string) => {
  const res = await api.patch(`/admin/jobs/${id}/unblock`)
  return res.data
}