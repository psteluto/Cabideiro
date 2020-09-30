import api from "../../utils/api";

const getAll = async () => {
  return await api.get("/products");
}

const getOne = async (id) => {
  return await api.get("/products/"+id);
}

const calculateShipping = async (zipcode) => {
  return {data: 12.00}
}

const sendPropose = async (value, days) => {
  // return await api.get("/");
  //TODO esperando endpoint
}

const getUserProducts = async () => {
  return await api.get("/products-users");
}

const add = async (product) => {
  const fd = new FormData();
  for ( const key in product ) {
    if (key !== 'images')
      fd.append(key, product[key]);
  }
  product.images.forEach(image => fd.append("images", image, image.name))

  return await api.post("/products-users", fd)
}

const update = async (product) => {
  const fd = new FormData();
  for ( const key in product ) {
    if (key !== 'images')
      fd.append(key, product[key]);
  }
  product.images.forEach(image => fd.append("images", image, image.name))

  return await api.put("/products-users", fd);
};

const remove = async (id) => {
  return await api.delete("/products-users", {data: {id}});
}

const getFilters = async () => {
  return await api.get("/products/filters");
}

const validateCoupon = async (coupon) => {
  return await api.post("/coupons", {coupon});
}

const registerOrder = async (productId, ownerId) => {
  return await api.post("/orders", {owner_id: ownerId, product_id: productId});
}

export default {
  getAll,
  getOne,
  calculateShipping,
  sendPropose,
  getUserProducts,
  update,
  remove,
  add,
  getFilters,
  validateCoupon,
  registerOrder
}
