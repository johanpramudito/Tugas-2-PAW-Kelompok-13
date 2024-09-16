const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");
const { deleteFilm } = require("../controllers/deleteController");
const { getAllFilms, getFilmByTitle } = require("../controllers/getController");

FilmRouter.post("/createFilm", createFilm);
FilmRouter.get("/", getAllFilms); // Untuk GET /film
FilmRouter.get("/:title", getFilmByTitle); // Untuk GET /film/:title

// UserRouter.put("/update/:id", updateUser);
FilmRouter.delete("/deleteFilm/:id", deleteFilm);

module.exports = FilmRouter;