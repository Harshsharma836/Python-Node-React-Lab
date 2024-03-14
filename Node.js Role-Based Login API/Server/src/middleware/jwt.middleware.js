import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "SECRET";

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Token is expired, so we will refresh itt
          const refreshToken = req.headers["x-refresh-token"];
          if (!refreshToken) {
            return res.sendStatus(401);
          }

          jwt.verify(refreshToken, SECRET, (err, decoded) => {
            if (err) {
              return res.sendStatus(403);
            }

            const newToken = jwt.sign(
              { id: decoded.id, role: decoded.role },
              SECRET,
              { expiresIn: "1h" },
            );
            req.user = decoded;
            res.setHeader("Authorization", `Bearer ${newToken}`);
            next();
          });
        } else {
          return res.sendStatus(403);
        }
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};
