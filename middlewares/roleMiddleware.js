export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check karo ki user role allowed hai ya nahi
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: only ${roles.join(
          ", "
        )} can perform this action`,
      });
    }
    next();
  };
};
