import api from "./apiClient"

export const getMyNotifications=async({params}:{params:{page:number,limit:number}})=>{
  const res = await api.get("/notifications/",{params})
  return res.data.data
}
export const markAllNotificationsAsRead=async()=>{
    console.log("called")
    const  res=await api.patch("/notifications/read-all")
    return res.data
}