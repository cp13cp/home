import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "cp123456");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Token is not valid" });
  }
}
