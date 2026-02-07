import api from "./apiClient";

export type OnlineUserResponse = {
  users: string[];
  count: number;
};

export const getOnlineUsersApi = async (): Promise<OnlineUserResponse> => {
  const { data } = await api.get<OnlineUserResponse>("/user/online");
  return data;
};