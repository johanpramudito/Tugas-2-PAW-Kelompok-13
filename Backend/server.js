const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");
const bcrypt = require('bcrypt');
const app = express();
const bcrypt = require('bcryptjs');
// const collection = require("./config");


// DOTENV CONFIG
dotenv.config();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));


//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// CORS
app.use(cors());

// MONGODB CONNECTION
if (!process.env.mongoDBURI) {
  throw Error("Database connection string not found");
}
mongoose.connect(process.env.mongoDBURI)
  .then(() => {
    console.log("Succesfully connected to MongoDB");
  }).catch((err) => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  });

// IMPORT MODEL
const FilmRouter = require("./api/routes/FilmRoutes.js");
const UserRouter = require("./api/routes/UserRoutes.js");

// ROUTES
app.get("/", (req, res) => {
  res.send("Kelompok 13 Backend Service");
});
// app.use("/user", require("./api/routes/UserRoutes"));
app.use("/film", FilmRouter);  // Menggunakan FilmRouter untuk route terkait film
app.use("/user", UserRouter);



// APP START
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
