import { privateKey } from "./private-key.mjs";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  } else {
    // Prend que le premier mot si le tocken comporte un espace
    const token = authorizationHeader.split(" ")[1];

    // Verifie si le jeton est valide 
    const decodedToken = jwt.verify(
      token,
      privateKey,
      (error, decodedToken) => {
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;

        // Verifie si l'utilisateur rentré correspond à l'utilisateur du token et qu'un utilisateur a été rentré
        if (req.body.userId && req.body.userId !== userId) {
          const message = `L'identifiant de l'utisateur est invalide`;
          return res.status(401).json({ message });
        } else {
          next();
        }
      }
    );
  }
};
export { auth };
