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
    // Vérification des données de la tâche

    if (!req.body.title) {
      return res.status(400).json({ message: "Le titre est requis." });
    }

    const taskData = {
      title: req.body.title,
      isDone: req.body.isDone !== undefined ? req.body.isDone : req.task.IsDone,
    };

    const updatedTask = await Task.update(req.params.id, taskData);
    if (!updatedTask) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }

    res.status(200).json({
      message: "Tâche modifiée avec succès.",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.status(200).json({ message: "Tâche supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {

    const updatedTask = await Task.toggleStatus(req.params.id);
    
    res.status(200).json({
      message: `Tâche marquée comme ${updatedTask.IsDone ? 'terminée' : 'non terminée'}`,
      task: updatedTask
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
