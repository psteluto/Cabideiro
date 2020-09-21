import api from "../../utils/api";

const getAll = async () => {
  return await api.get("/brands");
}

export default {
  getAll
}
