const sql = require("mssql");

// Configuration de la connexion à la base de données
const dbconfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  pool: {
    max: 10, // nombre maximum de connexions
    min: 0, // nombre minimum de connexions (0 = connexion à la demande)
    idleTimeoutMillis: 30000, // Délai d'attente maximum pour libérer une connexion
  },
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
};

// Création de la pool de connexion
const pool = new sql.ConnectionPool(dbconfig);
const poolConnect = pool.connect();

// Gestion des erreurs de connexion
poolConnect.catch((err) => {
  console.error(`Erreur de connexion à la base de données: ${err.message}`);
});

module.exports = { pool, sql };
