import api from "./apiClient"

export const getMyNotifications=async()=>{
  const res = await api.get("/notifications/")
  return res.data.data
}
export const markAllNotificationsAsRead=async()=>{
    const  res=await api.patch("/notification/read-all")
    return res.data
}