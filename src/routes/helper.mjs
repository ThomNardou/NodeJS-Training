import { products } from "../db/mock-product.mjs";

const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

export { success };
