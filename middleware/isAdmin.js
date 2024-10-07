const isAdmin = (req, res, next) => {
    console.log(req.user);
    
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }

  next();
};

module.exports = isAdmin;
