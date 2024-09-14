const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");
const { deleteFilm } = require("../controllers/deleteController");

FilmRouter.post("/createFilm", createFilm);
// UserRouter.get("/read", readUser);
// UserRouter.put("/update/:id", updateUser);
FilmRouter.delete("/deleteFilm/:id", deleteFilm);

module.exports = FilmRouter;