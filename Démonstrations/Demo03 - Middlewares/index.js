const express = require("express");
const loggerMiddleware = require("./middlewares/logger.middleware");
const auth = require("./middlewares/auth.middleware");

const app = express();
const PORT = 3000;

// Utilisation du middleware: Application-Level
app.use(loggerMiddleware);

// Routes pour tester
app.get("/", (req, res) => {
	res.status(200).json({ message: "Méthode GET" });
});

app.post("/", (req, res) => {
	res.status(200).json({ message: "Méthode POST" });
});

// Utilisation du middleware: Router-Level
app.get("/auth", auth, (req, res) => {
	res.status(200).json({ message: "Route sécurisée." });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
