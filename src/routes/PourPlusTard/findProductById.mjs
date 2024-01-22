import express from "express";
import {
  products,
  getProduct,
  removeProduct,
  updateProduct,
} from "../../db/mock-product.mjs";
import { success, getUniqueId } from "../helper.mjs";

const productsRouter = express();

productsRouter.get("/:id", (req, res) => {
  const productID = req.params.id;
  let product;

  for(let i = 0; i <products.length; i++) {
    if (products[i].id == productID) {
      product = products[i].id
      break;
    }
  }

  const message = `Le produit dont l'id vaut ${productID} à bien été trouvé son nom est ${product.name}`;
  res.json(success(message, product));
});
