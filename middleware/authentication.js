import jwt from "jsonwebtoken";

function authentication(req, res, next) {
    var token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {   
      token = token.slice(1,-1);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ message: 'Token expired' });
      }

      req.user = decoded;
      console.log(req.user);
      next();

    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

}

export default authentication;