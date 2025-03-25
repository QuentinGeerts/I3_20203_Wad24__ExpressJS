const logger = (req, res, next) => {
	console.log(`Requête interceptée: ${req.method} ${req.url}`);
	next();
};

module.exports = logger;
