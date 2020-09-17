import api from "../../utils/api";

const getAll = async () => {
  return await api.get("/products");
}

const getOne = async (id) => {
  return await api.get("/products/"+id);
}

const calculateShipping = async (zipcode) => {
  // return await api.get("/");
  //TODO esperando endpoint
}

const sendPropose = async (value, days) => {
  // return await api.get("/");
  //TODO esperando endpoint
}

export default {
  getAll,
  getOne,
  calculateShipping,
  sendPropose
}
