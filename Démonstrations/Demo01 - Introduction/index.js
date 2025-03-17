// Import CommonJS ( >< EcmaScript Module)
// Importation d'eXpress
const express = require("express");

// Créer l'application express
const app = express();
const PORT = 3000;

// Middleware pour parser le json
app.use(express.json());

// Route de base
// GET http://localhost:3000/
app.get("/", (req, res) => {
    // res.status(200).send("Hello World!");
    res.status(200).json({ message: "Hello World !" });
});

// POST http://localhost:3000/
app.post("/", (req, res) => {
    console.log("req.body: ", req.body);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
