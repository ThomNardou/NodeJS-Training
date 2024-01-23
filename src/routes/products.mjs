import express from "express";
import { success } from "./helper.mjs";
import { Product, sequelize } from "../db/sequelize.mjs";
import { ProductModel } from "../models/t_products.mjs";
import { DataTypes, where } from "sequelize";

const productsRouter = express();

///////////////////////////////////////////////////////////////////////// GET /////////////////////////////////////////////////////////////////////////
productsRouter.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      const message = "La liste de produit à été récuperer";

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
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

///////////////////////////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////////////////////////
productsRouter.delete("/:id", (req, res) => {
  const productId = req.params.id;

  Product.findByPk(productId).then((deletedProduct) => {
    Product.destroy({
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
  const productId = req.params.id;

  Product.update(req.body, {
    where: {
      id: productId,
    },
  })
    .then((products) => {

      if (products === null) {
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant. (404)";
        // A noter ici le return pour interrompre l'exécution du code
        return res.status(404).json({ message });
      }
      const message = `Le produit ${req.body.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, products));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { productsRouter };
