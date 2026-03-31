import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  // Lee de cookie O de Authorization header
  const token = req.cookies.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  console.log(token);
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

