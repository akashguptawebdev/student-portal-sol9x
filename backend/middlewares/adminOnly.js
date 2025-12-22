export const adminOnly = (req, res, next) => {
  console.log("req.user ", req.user )
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
  next();
};