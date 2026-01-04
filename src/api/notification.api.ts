import api from "./apiClient"

export const getMyNotifications=async()=>{
  const res = await api.get("/notifications/")
  return res.data.data
}
export const markAllNotificationsAsRead=async()=>{
    console.log("called")
    const  res=await api.patch("/notifications/read-all")
    return res.data
}