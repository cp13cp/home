const superAdminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res
      .status(403)
      .json({ message: "Access denied. Superadmins only." });
  }
  next();
};
export default superAdminMiddleware;
