import api from "../../utils/api";

const signUp = async (user) => {
  return await api.post("/users", user);
}

const addAddress = async (address) => {
  // TODO esperando ednpoint
  // return await api.post("/", address);
  return "";
}

const login = async (email_cpf, password) => {
  const params = {email_cpf, password};
  return await api.post("/sessions", params);
}

const getUserData = async () => {
  return await api.get("/profile");
}

const uploadPhoto = async (file) => {
  const fd = new FormData();
  fd.append('avatar', file);

  return await api.patch("/users/avatar", fd)
}

export default {
  signUp,
  login,
  addAddress,
  getUserData,
  uploadPhoto
}
