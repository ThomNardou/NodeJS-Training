import express from "express";
import {
  products,
  getProduct,
  removeProduct,
  updateProduct,
} from "../../db/mock-product.mjs";
import { success, getUniqueId } from "../helper.mjs";

const productsRouter = express();

productsRouter.delete("/:id", (req, res) => {
  const productId = req.params.id;
  let deletedProduct = getProduct(productId);

  removeProduct(productId);

  // Définir un message pour le consommateur de l'API REST
  const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
  // Retourner la réponse HTTP en json avec le msg et le produit créé
  res.json(success(message, deletedProduct));
});
