import express from "express";
import {
  products,
  getProduct,
  removeProduct,
  updateProduct,
} from "../../db/mock-product.mjs";
import { success, getUniqueId } from "../helper.mjs";

const productsRouter = express();

productsRouter.put("/:id", (req, res) => {
  const productId = req.params.id;
  const product = getProduct(productId);
  // Mise à jour du produit
  // A noter que la propriété 'created' n'étant pas modifiée, sera conservée telle quelle.
  const updatedProduct = {
    id: productId,
    ...req.body,
    created: product.created,
  };
  updateProduct(productId, updatedProduct);
  // Définir un message pour l'utilisateur de l'API REST
  const message = `Le produit ${updatedProduct.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;
  // Retourner la réponse HTTP en json avec le msg et le produit créé
  res.json(success(message, updatedProduct));
});
