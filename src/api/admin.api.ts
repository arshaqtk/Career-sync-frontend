import api from "./apiClient"

export const getRecruitersListApi = async () => {
  const res = await api.get("/admin/recruiters")
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


export const getCandidatesListApi = async () => {
  const res = await api.get("/admin/candidates")
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