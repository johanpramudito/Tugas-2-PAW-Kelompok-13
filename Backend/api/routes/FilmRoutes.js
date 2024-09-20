const FilmRouter = require("express").Router();

const { createFilm } = require("../controllers/postController");
const { deleteFilm } = require("../controllers/deleteController");
const { updateFilm } = require("../controllers/putController");
const { getAllFilms, getFilmByTitle, getFilmsByGenre } = require("../controllers/getController");

FilmRouter.post("/createFilm", createFilm);        
FilmRouter.put("/updateFilm/:id", updateFilm);      
FilmRouter.delete("/deleteFilm/:id", deleteFilm);  
FilmRouter.get("/genre/:genre", getFilmsByGenre);   // GET /film/genre/:genre
FilmRouter.get("/:title", getFilmByTitle);          // GET /film/:title
FilmRouter.get("/", getAllFilms);                   // GET /film (supports sorting with query ?sort=asc or ?sort=desc) contoh GET /films?sort=asc

module.exports = FilmRouter;