const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token manquant." });
  }

  try {
      const decode = jwt.decode(token, process.env.JWT_SECRET);
      req.userId = decode.id;
      next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé.' })
  }
};

module.exports = verifyToken;
