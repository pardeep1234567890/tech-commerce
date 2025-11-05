import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the 'Authorization' header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (it's "Bearer TOKEN_STRING")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the ID in the token and attach it to the 'req' object
      // We 'select -password' to make sure we don't send the hashed password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the next function (our controller)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };