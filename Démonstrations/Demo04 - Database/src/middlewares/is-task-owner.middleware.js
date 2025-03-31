const Task = require("../models/task.model");

const isTaskOwner = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }

    if (task.UserId !== req.userId) {
      return res
        .status(403)
        .json({ message: "Accès non autorisé à cette tâche." });
    }

    req.task = task;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = isTaskOwner;
