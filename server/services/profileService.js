import api from "./api";

export const updateProfile = (data) => {
  return api.put("/profile/me", data);
};