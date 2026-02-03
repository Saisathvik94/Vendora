import api from "./axios"

export const updateUserProfile = (data) =>
  api.patch("/user/profile", data)