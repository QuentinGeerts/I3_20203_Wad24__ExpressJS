const express = require("express");
const router = require("./router/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

// Routing de base

// Capture la route de base: http://localhost:3000/
app.get("/", (req, res) => {
    res.send("Page d'accueil");
});

// Permet de rediriger vers un path spécifié
app.get("/home", (req, res) => {
    res.redirect("/");
});

// Capture les routes:
// - http://localhost:3000/lang
// - http://localhost:3000/language
// - http://localhost:3000/languages
app.get("/lang(uages?)?", (req, res) => {
    res.send("Page des langues");
});

// Capture les routes:
// - http://localhost:3000/contact
// - http://localhost:3000/about
app.get(["/contact", "/about"], (req, res) => {
    res.send("Page contact & à propos");
});

// Segment dynamique
// Capture la route: http://localhost:3000/route/1
// Capture la route: http://localhost:3000/route/Quentin => plus possible
app.get("/route/:id([0-9]+)", (req, res) => {
    const id = req.params.id;
    res.send("id: " + id);
});

// Capture la route: http://localhost:3000/personne/geerts/quentin
app.get("/personne/:nom/:prenom", (req, res) => {
    const { nom, prenom } = req.params; // Déstructuration
    res.send("Nom: " + nom + ", prénom: " + prenom);
})

// ----

// Utilisation du router des tâches
app.use("/tasks", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
