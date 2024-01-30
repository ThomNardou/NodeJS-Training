import express from "express";
import { success } from "./helper.mjs";
import { Product, sequelize } from "../db/sequelize.mjs";
import { ProductModel } from "../models/t_products.mjs";
import { DataTypes, ValidationError, where, Op } from "sequelize";

const productsRouter = express();

///////////////////////////////////////////////////////////////////////// GET /////////////////////////////////////////////////////////////////////////

productsRouter.get("/", (req, res) => {
  // Si on a pas mis de paramètre
  if (req.query.name) {
    if (req.query.name.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }

    let limit = 3;
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    // Permet d'arreter l'execution de la fonction (on l'a mis là pour faire beau)
    return Product.findAndCountAll({
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      limit: limit,
      order: ["name"],
    }).then((products) => {
      const message = `Il y a ${products.count} produits qui correspondent au terme de la recherche`;
      res.json(success(message, products));
    });
  }
  Product.findAll()
    .then((products) => {
      const message = "La liste des produits a bien été récupérée.";
      res.json(success(message, products));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

///////////////////////////////////////////////////////////////////////// GET BY ID /////////////////////////////////////////////////////////////////////////
productsRouter.get("/:id", (req, res) => {
  const productID = req.params.id;

  Product.findByPk(productID)
    .then((products) => {
      if (products === null) {
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant. (404)";
        // A noter ici le return pour interrompre l'exécution du code
        return res.status(404).json({ message });
      }

      const message = `Le produit dont l'id vaut ${productID} à bien été trouvé son nom est ${req.body.name}`;

      res.json(success(message, products));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

///////////////////////////////////////////////////////////////////////// INSERT /////////////////////////////////////////////////////////////////////////
productsRouter.post("/", (req, res) => {
  Product.create(req.body)

    .then((products) => {
      const message = `Le produit ${req.body.name} à bien été créer`;
      res.json(success(message, products));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le produit n'a pas pu être ajouté. Merci e réessayer dans quelques instants.";

      res.status(500).json({ message, data: error });
    });
});

///////////////////////////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////////////////////////
productsRouter.delete("/:id", (req, res) => {
  const productId = req.params.id;

  Product.findByPk(productId).then((deletedProduct) => {
    return Product.destroy({
      where: {
        id: deletedProduct.id,
      },
    })
      .then((products) => {
        if (products === null) {
          const message =
            "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant. (404)";
          // A noter ici le return pour interrompre l'exécution du code
          return res.status(404).json({ message });
        }

        const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
        res.json(success(message, products));
      })
      .catch((error) => {
        const message =
          "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
});

///////////////////////////////////////////////////////////////////////// UPDATE /////////////////////////////////////////////////////////////////////////
productsRouter.put("/:id", (req, res) => {

  // Va récuper la valeur du ":id"
  const productId = req.params.id;

  Product.update(req.body, { where: { id: productId } })
    .then((_) => {
      return Product.findByPk(productId).then((updatedProduct) => {
        if (updatedProduct === null) {
          const message =
            "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          // A noter ici le return pour interrompre l'exécution du code
          return res.status(404).json({ message });
        }
        // Définir un message pour l'utilisateur de l'API REST
        const message = `Le produit ${updatedProduct.name} dont l'id vaut ${updatedProduct.id} a été mis à jour avec succès`;
        // Retourner la réponse HTTP en json avec le msg et le produit créé
        res.json(success(message, updatedProduct));
      });
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { productsRouter };
