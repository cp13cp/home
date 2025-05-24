// isAdmin.js
const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next(); // user is admin, allow to proceed
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

export default isAdmin;
