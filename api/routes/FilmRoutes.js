const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");

FilmRouter.post("/createFilm", createFilm);
// UserRouter.get("/read", readUser);
// UserRouter.put("/update/:id", updateUser);
// UserRouter.delete("/delete/:id", deleteUser);

module.exports = FilmRouter;