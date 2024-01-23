import express from "express";
import { success, getUniqueId } from "./helper.mjs";
import { Product, sequelize } from "../db/sequelize.mjs";
import { ProductModel } from "../models/t_products.mjs";
import { DataTypes, where } from "sequelize";

const productsRouter = express();


///////////////////////////////////////////////////////////////////////// GET /////////////////////////////////////////////////////////////////////////
productsRouter.get("/", (req, res) => {
  Product.findAll().then((products) => {
    const message = "La liste de produit à été récuperer";

    res.json(success(message, products));
  })
  .catch((error) => {
    console.log(error)
  })
});


///////////////////////////////////////////////////////////////////////// GET BY ID /////////////////////////////////////////////////////////////////////////
productsRouter.get("/:id", (req, res) => {
  const productID = req.params.id;

  Product.findAll({
    where: {
      id: productID,
    },
  }).then((products) => {
    const message = `Le produit dont l'id vaut ${productID} à bien été trouvé son nom est ${req.body.name}`;

    res.json(success(message, products));
  })
  .catch((error) => {
    console.log(error)
  })
});


///////////////////////////////////////////////////////////////////////// INSERT /////////////////////////////////////////////////////////////////////////
productsRouter.post("/", (req, res) => {
  console.log(req);
  sequelize.sync().then(() => {
    Product.create({
      name: req.body.name,
      price: req.body.price,
    })
      .then((products) => {
        console.log("ok");
        const message = `Le produit ${req.body.name} à bien été créer`;
        res.json(success(message, products));
      })
      .catch((error) => {
        console.error(error);
      });
  });
});


///////////////////////////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////////////////////////
productsRouter.delete("/:id", (req, res) => {
  const productId = req.params.id;

  Product.destroy({
    where: {
      id: productId,
    },
  }).then((products) => {
    const message = `Le produit ${req.body.name} a bien été supprimé !`;
    res.json(success(message, products));
  })
  .catch((error) => {
    console.log(error)
  })
});


///////////////////////////////////////////////////////////////////////// UPDATE /////////////////////////////////////////////////////////////////////////
productsRouter.put("/:id", (req, res) => {
  const productId = req.params.id;

  Product.update(
    {
      name: req.body.name,
      price: req.body.price,
    },
    {
      where: {
        id: productId,
      },
    }
  )
  .then((products) => {
    const message = `Le produit ${req.body.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;
    // Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, products));
  })
  .catch((error) => {
    console.log(error);
  });

});

export { productsRouter };
