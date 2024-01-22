import { products } from "../db/mock-product.mjs";

const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

const getUniqueId = () => {
  let productsIds = [];

  products.forEach((product) => {
    productsIds.push(product.id);
  });

  let maxId = Math.max(...productsIds);
  const uniqueId = maxId + 1;
  return uniqueId;

  // const maxId = productsIds.reduce((a, b) => {
  //   console.log(a + " " + b);
  //   Math.max(a, b);
  // });
  
};
export { success, getUniqueId };
