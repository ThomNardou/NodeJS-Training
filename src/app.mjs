import express from "express";
import { sequelize, initDB, Product } from "./db/sequelize.mjs";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));

import { productsRouter } from "./routes/products.mjs";
initDB()


app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Exemple app listening on port http://localhost:${port}`);
});
