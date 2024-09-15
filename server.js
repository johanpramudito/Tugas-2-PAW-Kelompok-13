const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");
const app = express();

// DOTENV CONFIG
dotenv.config();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

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
const Film = require("./api/models/Film");
const User = require("./api/models/User");

// ROUTES
app.get("/", (req, res) => {
  res.send("Kelompok 13 Backend Service");
});
app.use("/user", require("./api/routes/UserRoutes"));


// Get all films
app.get('/film', async (req, res) => {  
  try {
    const films = await Film.find({});  
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get films by tittle
app.get('/film/:title', async (req, res) => {
  try {
    const { title } = req.params;  
    const film = await Film.findOne({ title });  

    if (!film) {
      return res.status(404).json({ message: `Film with title ${title} not found` });
    }

    res.status(200).json(film);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all user
app.get('/user', async (req, res) => {  
  try {
    const users = await User.find({});  
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get user by name
app.get('/user/:name', async (req, res) => {  
  try {
    const { name } = req.params;  
    const user = await User.findOne({ name: { $regex: new RegExp(name, 'i') } });  //suapaya besar kecil huruf ga berpengaruh
    if (!user) {
      return res.status(404).json({ message: `User with name ${name} not found` });
    }

    res.status(200).json(user);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// APP START
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
