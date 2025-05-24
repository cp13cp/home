function checkRole(req, res, next) {
  const userRole = req.user.role; // Assume req.user is set after authentication
  if (userRole === "admin" || userRole === "superadmin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied." });
  }
}
export default checkRole;
