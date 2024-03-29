import express from "express";
import { sequelize, initDB, Product } from "./db/sequelize.mjs";
import { productsRouter } from "./routes/products.mjs";
import { loginRouter } from "./routes/login.mjs";
import { swaggerSpec } from "./swagger.mjs";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 3000;


// Route pour accéder à la documentation Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

app.get("/EasterEgg", (req, res) => {
  res.send("Bravo vous avez trouvé un easter egg");
});

sequelize
  // Va regarder si la connection a pu se faire
  .authenticate()
  // Si elle a pu se connecter
  .then(() =>
    console.log("La connexion à la base de données a bien été établie")
  )
  // Elle a pas pu se connecter
  .catch((error) => console.error("Impossible de se connecter à la DB"));

initDB();

app.use("/api/products", productsRouter);
app.use("/api/login", loginRouter);

app.use(({ res }) => {
  const message =
    "Impossible de trouver la resource demandée ! veuillez saisir une autre URL (404)";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Exemple app listening on port http://localhost:${port}`);
});
