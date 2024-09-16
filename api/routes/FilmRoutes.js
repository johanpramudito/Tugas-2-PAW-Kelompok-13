const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");
const { deleteFilm } = require("../controllers/deleteController");
const { updateFilm } = require("../controllers/updateController");

FilmRouter.post("/createFilm", createFilm);
// UserRouter.get("/read", readUser);
UserRouter.put("/updateFilm/:id", updateUser);
FilmRouter.delete("/deleteFilm/:id", deleteFilm);

module.exports = FilmRouter;