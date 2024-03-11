import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'SECRET';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
};
