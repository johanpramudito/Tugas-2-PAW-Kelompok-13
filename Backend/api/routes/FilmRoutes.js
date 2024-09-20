const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");
const { deleteFilm } = require("../controllers/deleteController");
const { updateFilm } = require("../controllers/putController");
const { getAllFilms, getFilmByTitle, getFilmsByGenre } = require("../controllers/getController");

FilmRouter.post("/createFilm", createFilm);
FilmRouter.put("/updateFilm/:id", updateFilm);
FilmRouter.delete("/deleteFilm/:id", deleteFilm);
FilmRouter.get("/", getAllFilms); // Untuk GET /film
FilmRouter.get("/:title", getFilmByTitle); // Untuk GET /film/:title
FilmRouter.get("/genre/:genre", getFilmsByGenre);

module.exports = FilmRouter;