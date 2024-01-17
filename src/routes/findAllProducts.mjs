import express from "express";
import { products, getProduct, removeProduct, updateProduct } from "../db/mock-product.mjs";
import { success, getUniqueId } from "./helper.mjs";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
    const message = "La liste de produit à été récuperer";
  
    res.json(success(message, products));
  });