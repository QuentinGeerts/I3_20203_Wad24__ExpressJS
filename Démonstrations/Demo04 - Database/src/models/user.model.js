const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { pool, sql } = require("../config/db.config");

class User {
  constructor(email, password) {
    this.id = uuidv4();
    this.email = email;
    this.password = password;
  }

  // Opérations sur un utilisateurs

  // 1. Création d'un nouvel utilisateur
  /**
   * Permet de créer un nouvel utilisateur en base de données
   * @param {User} newUser
   */
  static async create(newUser) {
    try {
      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);

      // Connexion à la base de données
      await pool.connect();

      // Requête SQL pour insérer un nouvel utilisateur
      const request = pool.request();
      request.input("id", sql.UniqueIdentifier, newUser.id);
      request.input("email", sql.NVarChar, newUser.email);
      request.input("password", sql.VarBinary, Buffer.from(hashedPassword));

      const command = `
        INSERT INTO [User] (Id, Email, Password)
        VALUES (@id, @email, @password);
        SELECT * FROM [User] WHERE [Id] = @id;
    `;

      const result = await request.query(command);

      console.log("Result: ", result);

      return result.recordset[0];
    } catch (error) {
      console.log("Erreur lors de la création de l'utilisateur");
      throw new Error(error);
    }
  }

  static async findByEmail(email) {
    try {
      // Connexion à la base de données
      await pool.connect();

      // Création de la requête
      const request = pool.request();
      request.input("email", sql.NVarChar, email);

      const command = `SELECT * FROM [User] WHERE [Email] = @email`;

      const result = await request.query(command);
      return result.recordset[0];
    } catch (error) {
      console.log(`Erreur lors de la recherche d'utilisateur par email.`);
      throw new Error("Erreur lors de la recherche d'utilisateur par email.");
    }
  }
}

module.exports = User;
