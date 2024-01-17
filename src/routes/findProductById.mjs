import express from "express";
import { products, getProduct, removeProduct, updateProduct } from "../db/mock-product.mjs";
import { success, getUniqueId } from "./helper.mjs";

const productsRouter = express();

productsRouter.get("/:id", (req, res) => {
    const productID = req.params.id;
    const product = products.find((product) => product.id == productID);
    const message = `Le produit dont l'id vaut ${productID} à bien été trouvé son nom est ${product.name}`;
    res.json(success(message, product));
  });
  