let products = [
  {
    id: 1,
    name: "Big Mac",
    price: 5.99,
    created: new Date(),
  },
  {
    id: 2,
    name: "Coca",
    price: 2.38,
    created: new Date(),
  },
  {
    id: 3,
    name: "Sprite",
    price: 1.99,
    created: new Date(),
  },
];

const getProduct = (productId) => {
  return products.find((product) => product.id == productId);
};

const removeProduct = (productId) => {
  products = products.filter((product) => product.id != productId);
};

const updateProduct = (productId, updatedProduct) => {
  products = products.map((product) =>
    product.id == productId ? updatedProduct : product
  );
};

export { products, getProduct, removeProduct, updateProduct };
