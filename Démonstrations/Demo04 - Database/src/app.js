const express = require("express");
const cors = require("cors");
const routes = require("./routes");

// Création de l'application
const app = express();

// Middlewares intégrés et tiers
app.use(express.json()); // Parser le json dans le body
app.use(cors()); // Gérer les CORS

// Routes 
app.use("/api", routes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Erreur serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Pour les tests unitaires
module.exports = app;
