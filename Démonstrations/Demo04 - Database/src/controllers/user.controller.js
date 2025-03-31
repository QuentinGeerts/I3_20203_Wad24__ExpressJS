const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Création d'un utilisateur
exports.register = async (req, res) => {
  try {
    // Valider la requête
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email / mot de passe requis." });
    }

    const existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const newUser = new User(req.body.email, req.body.password);
    const user = await User.create(newUser);

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.Id, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_IN }
    );

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user.Id,
        email: user.Email
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion d'une utilisateur
exports.login = (req, res) => {};
