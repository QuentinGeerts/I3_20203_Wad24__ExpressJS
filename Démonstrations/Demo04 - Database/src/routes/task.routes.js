const router = require("express").Router();
const taskController = require('../controllers/task.controller');
const isTaskOwner = require("../middlewares/is-task-owner.middleware");
const verifyToken = require("../middlewares/verify-token.middelware");

// Application-Level Middelware
router.use(verifyToken); // Vérifier que le token soit présent

// Créer une tâche
router.post('/', taskController.create);

// Récupérer toutes les tâches de l'utilisateur
router.get('/', taskController.findAll);

// Récupérer une tâche spécifique
router.get('/:id', taskController.findOne);

// Mettre à jour une tâche
router.put('/:id', isTaskOwner, taskController.update);

// Supprimer une tâche
// Changer le status d'une tâche (terminée / non terminée)

module.exports = router;
