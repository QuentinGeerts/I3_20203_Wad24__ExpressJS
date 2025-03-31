const router = require('express').Router();
const userController = require('../controllers/user.controller');


// L'inscription
router.post('/register', userController.register);

// Connexion
router.post('/login', userController.login);

module.exports = router;