const express = require("express");
const loggerMiddleware = require("./middlewares/logger.middleware");
const auth = require("./middlewares/auth.middleware");
const errorHandler = require("./middlewares/error-handler.middleware");
const morgan = require("morgan");
const { default: helmet } = require("helmet");

const app = express();
const PORT = 3000;

// Utilisation de middlewares intégrés
app.use(express.json()); // Middleware pour parser le json dans le body
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les données depuis un formulaire
app.use(morgan("dev")); // Middleware pour logger les requêtes effectuées
app.use(cors()); // Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
app.use(helmet()); // Middleware pour gérer les attaques XSS (Cross-Site Scripting)

// Utilisation du middleware: Application-Level
// app.use(loggerMiddleware);

// Routes pour tester
app.get("/", (req, res) => {
	res.status(200).json({ message: "Méthode GET" });
});

app.post("/", (req, res) => {
  console.log('req.body :>> ', req.body);
	res.status(200).json({ message: "Méthode POST" });
});

// Utilisation du middleware: Router-Level
app.get("/auth", auth, (req, res) => {
	res.status(200).json({ message: "Route sécurisée." });
});

// Utilisation du middleware: Error-Handling-Level
app.get("/error", (req, res) => {
  // const { hello } = req.body; // Cas d'erreur
  throw new Error("Aie aie c'est cassé !");
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
