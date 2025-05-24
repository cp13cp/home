const adminMiddleware = (req, res, next) => {
  if (!req.user || !["admin", "superadmin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

export default adminMiddleware;
