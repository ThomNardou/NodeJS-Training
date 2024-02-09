import express from "express";
import bcrypt from "bcrypt";
import { privateKey } from "../auth/private-key.mjs";
import { User } from "../db/sequelize.mjs";
import jwt  from "jsonwebtoken";

const loginRouter = express();

loginRouter.post("/", (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    // Test la connexion à la base de donnée
    .then((user) => {
      // Si l'utilisateur existe
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas`;
        return res.status(404).json({ message });
      }

      // Permet de comparer le mot de passe hashé dans la db avec le MDP fourni
      bcrypt
      .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          // Si le mot de passe rentré est juste
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrecte.`;
            return res.status(401).json({ message });
          } else {
            // JWT = création du jeton de connexion
            const token = jwt.sign({ userId: user.id }, privateKey, {
              // Date d'expiration du token
              expiresIn: "1y",
            });
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          }
        });
    })
    .catch((error) => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
      return res.json({ message, data: error });
    });
});

export { loginRouter };
