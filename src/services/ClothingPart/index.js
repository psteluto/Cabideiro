import api from "../../utils/api";

const getAll = async () => {
  return await api.get("/clothing-parts");
}

export default {
  getAll
}
