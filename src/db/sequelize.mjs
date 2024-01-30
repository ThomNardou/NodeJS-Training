import { DataTypes, Sequelize } from "sequelize";
import { products } from "./mock-product.mjs";
import { ProductModel } from "../models/t_products.mjs";

const sequelize = new Sequelize(
  "db_products", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    dialect: "mysql",
    port: 6033,
    logging: true,
  }
);

const Product = ProductModel(sequelize, DataTypes)

let initDB =  () => {
    return sequelize
    // Demande à sequelize d'executer une action sur la base de donnée (ouvrir la connection)
    .sync({force: true})
    .then(() => {
        importProducts();
        console.log("La base de donnée à été syncronisé !")
    })
}

const importProducts = () => {
    products.map((product) => {
        Product.create({
            name: product.name,
            price: product.price,
        }).then((product) => console.log(product.toJSON()))
    })
}

export { sequelize, initDB, Product };
