import express from "express";

const app = express()
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World !");
});

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`)
});

import { productsRouter } from "./routes/products.mjs";
app.use("/api/products", productsRouter);

app.listen(port, () => {
    console.log(`Exemple app listening on port http://localhost:${port}`);
})