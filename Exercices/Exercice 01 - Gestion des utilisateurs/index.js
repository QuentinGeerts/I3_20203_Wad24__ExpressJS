const express = require('express');
const userRouter = require('./routes/user.router');


const app = express();
const PORT = 3000;

// Middleware pour parser le json dans le req.body
app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});