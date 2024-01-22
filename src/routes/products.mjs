import express from "express";
import { products, getProduct, removeProduct, updateProduct } from "../db/mock-product.mjs";
import { success, getUniqueId } from "./helper.mjs";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
  const message = "La liste de produit à été récuperer";

  res.json(success(message, products));
});

productsRouter.get("/:id", (req, res) => {
  const productID = req.params.id;
  let product;

  for(let i = 0; i <products.length; i++) {
    if (products[i].id == productID) {
      product = products[i]
      break;
    }
  }

  const message = `Le produit dont l'id vaut ${productID} à bien été trouvé son nom est ${product.name}`;
  res.json(success(message, product));
});

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

productsRouter.delete("/:id", (req, res) => {
  const productId = req.params.id;
  let deletedProduct = getProduct(productId);

  removeProduct(productId);

  // Définir un message pour le consommateur de l'API REST
  const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
  // Retourner la réponse HTTP en json avec le msg et le produit créé
  res.json(success(message, deletedProduct));
});

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

export { productsRouter };
