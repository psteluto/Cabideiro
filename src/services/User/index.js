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

export default {
  signUp,
  login,
  addAddress
}
