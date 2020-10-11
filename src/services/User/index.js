import api from "../../utils/api";

const signUp = async (user) => {
  return await api.post("/users", user);
}

const login = async (email_cpf, password) => {
  const params = {email_cpf, password};
  return await api.post("/sessions", params);
}

const getUserData = async (id = localStorage.getItem("userId")) => {
  return await api.get("/profile", {params: {user_id: id}})
}

const getAddress = async () => {
  return await api.get("/users/address");
}

const updateAddress = async (address) => {
  return await api.post("/users/address", address);
}

const updateProfile = async (profile) => {
  return await api.put("/profile", profile)
}

const uploadPhoto = async (file) => {
  const fd = new FormData();
  fd.append('avatar', file);

  return await api.patch("/users/avatar", fd)
}

export default {
  signUp,
  login,
  getUserData,
  uploadPhoto,
  getAddress,
  updateAddress,
  updateProfile
}
