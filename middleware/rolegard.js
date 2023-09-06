// Middleware to check user role
const roleGuard = (requiredRole) => {
    return (req, res, next) => {
      try {
        const user = req.user; 
        const userRole = user.role;
  
        if (userRole !== requiredRole) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    };
  };
  
  export default roleGuard;