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

app.get("/EasterEgg", (req, res) => {
  res.send("Bravo vous avez trouvé un easter egg");
})

sequelize
  // Va regarder si la connection a pu se faire
  .authenticate()
  // Si elle a pu se connecter
  .then(() =>
    console.log("La connexion à la base de données a bien été établie")
  )
  // Elle a pas pu se connecter
  .catch((error) => console.error("Impossible de se connecter à la DB"));

import { productsRouter } from "./routes/products.mjs";


initDB();

app.use("/api/products", productsRouter);

app.use(({ res }) => {
  const message = "Impossible de trouver la resource demandée ! veuillez saisir une autre URL (404)";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Exemple app listening on port http://localhost:${port}`);
});
