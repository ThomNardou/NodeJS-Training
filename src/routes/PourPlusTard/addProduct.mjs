import express from "express";
import { products, getProduct, removeProduct, updateProduct } from "../../db/mock-product.mjs";
import { success, getUniqueId } from "../helper.mjs";

const productsRouter = express();

productsRouter.post("/", (req, res) => {
  // Création d'un id
  const id = getUniqueId(products);

  //Création du produit
  const createdProduct = { ...req.body, ...{ id: id, created: new Date() } };

  // Inssertion du produit
  products.push(createdProduct);

  const message = `Le produit ${createdProduct.name} à bien été créer`;

  res.json(success(message, createdProduct));
});