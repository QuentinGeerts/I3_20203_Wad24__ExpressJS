const router = require("express").Router();

const tasks = [
    { id: 1, title: "Faire la vaisselle", completed: false },
    { id: 2, title: "Nettoyer la litière", completed: false },
];

let tasksId = tasks.length;

// CRUD:
// → GET
// → POST
// → PUT
// → PATCH
// → DELETE

// GET http://localhost:3000/tasks/
router.get("/tasks", (request, response) => {
    response.status(200).json(tasks);
});

// GET http://localhost:3000/tasks/:id
router.get("/:id", (req, res) => {
    // 1. Extraire l'id de l'URL
    // const id = req.params.id;
    const { id } = req.params;

    // const task = tasks.find(t => t.id === parseInt(id));
    const task = tasks.find((t) => t.id === +id);

    if (!task)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });

    res.status(200).json(task);
});

// POST http://localhost:3000/tasks/
router.post("/", (req, res) => {
    const { title } = req.body;

    if (tasks.find((t) => t.title.toLowerCase() === title.toLowerCase())) {
        return res.status(400).json({
            code: 400,
            error: "Bad Request",
            message: "Le titre est déjà présent dans la liste.",
            origin: title,
        });
    }

    const task = { id: ++tasksId, title: title, completed: false };

    tasks.push(task);
    res.status(201).json(task);
});

// PUT http://localhost:3000/tasks/:id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = tasks.find((t) => t.id === +id);

    if (!task)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });
    
    if (tasks.find(t => t.title.toLowerCase() === title.toLowerCase() && t.id !== +id)) 
        return res.status(400).json({
            code: 400,
            error: "Bad Request",
            message: "Le titre est déjà présent dans la liste.",
            origin: title,
        });

    task.title = title;
    task.completed = completed;

    res.status(200).json(task);
});


// DELETE http://localhost:3000/tasks/:id
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const taskId = tasks.findIndex(t => t.id === +id);

    if (taskId === -1)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });

    tasks.splice(taskId, 1);
    res.sendStatus(200);

});

// PATCH http://localhost:3000/tasks/:id
router.patch("/:id", (req, res) => {

    const { id } = req.params;
    const { title, completed } = req.body;

    console.log('req.body :>> ', req.body);
    console.log('title :>> ', title);
    console.log('completed :>> ', completed);

    const task = tasks.find((t) => t.id === +id);

    if (!task)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });
    
    if (title && tasks.find(t => t.title.toLowerCase() === title.toLowerCase() && t.id !== +id)) 
        return res.status(400).json({
            code: 400,
            error: "Bad Request",
            message: "Le titre est déjà présent dans la liste.",
            origin: title,
        });

    if (title != undefined) task.title = title;
    if (completed != undefined) task.completed = completed;

    res.status(200).json(task);

});

module.exports = router;
