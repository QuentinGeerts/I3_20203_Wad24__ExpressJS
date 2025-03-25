const userRouter = require("express").Router();

const users = [
	{
		id: 1,
		lastname: "Geerts",
		firstname: "Quentin",
		email: "quentin.geerts@bstorm.be",
	},
];

let id = users.length + 1;

// Routing

// GET http://localhost:3000/utilisateurs
userRouter.get("/utilisateurs", (req, res) => {
	res.status(200).json(users);
});

// GET http://localhost:3000/utilisateurs/1
userRouter.get("/utilisateurs/:id([0-9]+)", (req, res) => {
	const { id } = req.params;

	const user = users.find((u) => u.id === +id);

	if (!user) {
		return res.status(404).json({
			error: "Utilisateur introuvable.",
		});
	}

	res.status(200).json(user);
});

// POST http://localhost:3000/ajouter-utilisateur
userRouter.post("/ajouter-utilisateur", (req, res) => {
	const { lastname, firstname, email } = req.body;

	if (!lastname || !firstname || !email)
		return res.status(400).json({
			error: "Le nom, prénom et email sont requis.",
		});

	if (users.some((u) => u.email === email))
		return res.status(400).json({
			error: "L'email est déjà utilisée.",
		});

	const newUser = { id: id++, lastname, firstname, email };

	users.push(newUser);

	res.status(201).json({
		message: "Utilisateur créé avec succès.",
		user: newUser,
	});
});

// PUT http://localhost:3000/modifier-utilisateur/1
userRouter.put("/modifier-utilisateur/:id([0-9]+)", (req, res) => {
	const { id } = req.params;
	const { lastname, firstname, email } = req.body;

	const index = users.findIndex((u) => u.id === +id);

	if (index === -1) return res.status(404).json({ error: "Id introuvable." });

	if (!lastname || !firstname || !email)
		return res.status(400).json({
			error: "Le nom, prénom et email sont requis.",
		});

	if (users.some((u) => u.email === email && u.id !== +id))
		return res.status(400).json({
			error: "L'email est déjà utilisée.",
		});

	users[index] = {
		...users[index],
		lastname,
		firstname,
		email,
	};

	res.status(200).json({
		message: "Utilisateur modifié avec succès.",
		user: users[index],
	});
});

// DELETE http://localhost:3000/supprimer-utilisateur/1
userRouter.delete("/supprimer-utilisateur/:id([0-9]+)", (req, res) => {
	const { id } = req.params;

	const index = users.findIndex((u) => u.id === +id);

	if (index === -1) return res.status(404).json({ error: "Id introuvable." });

  users.splice(index, 1);
  res.status(200).json({
    message: "Utilisateur supprimé avec succès."
  });
});

module.exports = userRouter;
