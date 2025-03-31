const router = require('express').Router();
const userRouter = require('./user.routes');
const taskRouter = require('./task.routes');

// Routes utilisateurs
router.use('/users', userRouter);

// Routes tâches
router.use('/tasks', taskRouter);

module.exports = router;