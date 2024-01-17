import { products } from "../db/mock-product.mjs";

const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

const getUniqueId = () => {
  const productsIds = products.map((product) => product.id);
  const maxId = productsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  return uniqueId;
};
export { success, getUniqueId };
