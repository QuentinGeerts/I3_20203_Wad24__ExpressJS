const auth = (req, res, next) => {
	const token = req.headers.authorization;

	console.log("Token:", token);

	if (!token || token !== "Bearer MonVraiToken")
		return res.status(401).json({ error: "Accès non autorisé." });

	next();
};

module.exports = auth;
