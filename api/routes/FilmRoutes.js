const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");
const { deleteFilm } = require("../controllers/deleteController");
const { updateFilm } = require("../controllers/putController");
const { getAllFilms, getFilmByTitle, getFilmsByGenre } = require("../controllers/getController");

FilmRouter.post("/createFilm", createFilm);
// UserRouter.get("/read", readUser);
// UserRouter.put("/update/:id", updateUser);
FilmRouter.delete("/deleteFilm/:id", deleteFilm);
FilmRouter.get("/getFilm", getAllFilms); // Untuk GET /film
FilmRouter.get("/getFilm/:title", getFilmByTitle); // Untuk GET /film/:title
FilmRouter.get("/genre/:genre", getFilmsByGenre)
module.exports = FilmRouter;