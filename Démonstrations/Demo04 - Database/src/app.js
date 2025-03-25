const express = require("express");
const cors = require("cors");

// Création de l'application
const app = express();

// Middlewares intégrés et tiers
app.use(express.json()); // Parser le json dans le body
app.use(cors()); // Gérer les CORS

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
