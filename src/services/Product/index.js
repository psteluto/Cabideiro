import api from "../../utils/api";

const getAll = async () => {
  return await api.get("/products");
}

export default {
  getAll
}
