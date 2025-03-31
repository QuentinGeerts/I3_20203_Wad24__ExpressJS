const { v4: uuidv4 } = require("uuid");
const { pool, sql } = require("../config/db.config");

class Task {
  constructor(title, userId, isDone = false) {
    this.id = uuidv4();
    this.title = title;
    this.userId = userId;
    this.isDone = isDone;
  }

  /**
   *
   * @param {Task} newTask
   */
  static async create(newTask) {
    try {
      // Connexion à la pool
      await pool.connect();

      // Création de la requête
      const request = pool.request();
      request.input("id", sql.UniqueIdentifier, newTask.id);
      request.input("title", sql.NVarChar, newTask.title);
      request.input("isDone", sql.Bit, newTask.isDone);
      request.input("userId", sql.UniqueIdentifier, newTask.userId);

      const command = `
            INSERT INTO [Task] (Id, Title, IsDone, UserId)
            VALUES (@id, @title, @isDone, @userId);
            SELECT * FROM Task WHERE Id = @id;
            `;

      const result = await request.query(command);
      return result.recordset[0];
    } catch (error) {
      throw new Error("Erreur lors de la création de la tâche.");
    }
  }

  static async findByUserId(userId) {
    try {
      await pool.connect();

      const request = pool.request();
      request.input("userId", sql.UniqueIdentifier, userId);

      const command =
        "SELECT * FROM Task WHERE UserId = @userId ORDER BY IsDone, Title";
      const result = await request.query(command);
      return result.recordset;
    } catch (error) {
      throw new Error("Erreur lors de la recherche par l'id de l'utilisateur.");
    }
  }

  static async findById(id) {
    try {
      await pool.connect();

      const request = pool.request();
      request.input("id", sql.UniqueIdentifier, id);

      const command = `SELECT * FROM Task WHERE Id = @id`;
      const result = await request.query(command);

      return result.recordset[0];
    } catch (error) {
      console.log(
        `Erreur lor de la récupération de la tâche par Id: ${error.message}`
      );
      throw new Error("Erreur lor de la récupération de la tâche par Id");
    }
  }

  static async update(id, task) {
    try {

      await pool.connect();

      const request = pool.request();
      request.input('id', sql.UniqueIdentifier, id);
      request.input('title', sql.NVarChar, task.title);
      request.input('isDone', sql.Bit, task.isDone);

      const command = `
      UPDATE Task
      SET Title = @title, IsDone = @isDone
      WHERE Id = @id;
      SELECT * FROM Task WHERE Id = @id;
      `;

      const result = await request.query(command);
      return result.recordset[0];

    } catch (error) {
      console.log(`Erreur lor de la modification de la tâche: ${error.message}`);
      throw new Error("Erreur lor de la modification de la tâche");
    }
  }
}

module.exports = Task;
