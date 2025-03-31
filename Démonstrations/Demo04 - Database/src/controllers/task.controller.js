const Task = require("../models/task.model");

exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Le titre est requis." });
    }

    // Création d'une nouvelle tâche
    const newTask = new Task(req.body.title, req.userId, req.body.isDone);

    const task = await Task.create(newTask);
    res.status(201).json({
      message: "Tâche créée avec succès.",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }

    // Vérifier si l'utilisateur est bien le propriétaire de la tâche

    if (task.UserId !== req.userId) {
      return res
        .status(403)
        .json({ message: "Accès non autorisé à cette tâche." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
