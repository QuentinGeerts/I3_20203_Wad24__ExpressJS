const router = require("express").Router();
const taskController = require('../controllers/task.controller');
const verifyToken = require("../middlewares/verify-token.middelware");

// Application-Level Middelware
router.use(verifyToken); // Vérifier que le token soit présent

// Créer une tâche
router.post('/', taskController.create);

// Récupérer toutes les tâches de l'utilisateur
router.get('/', taskController.findAll);

// Récupérer une tâche spécifique
// Mettre à jour une tâche
// Supprimer une tâche
// Changer le status d'une tâche (terminée / non terminée)

module.exports = router;
