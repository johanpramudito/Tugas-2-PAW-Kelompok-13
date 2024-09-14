const User = require("../models/User");
const Film = require("../models/Film");

exports.createUser = async (req, res) => {
    const { name, gender, phone, email, address, dateOfBirth } = req.body;
  
    const user = new User({
      name,
      gender,
      phone, 
      email, 
      address, 
      dateOfBirth
    });
    user
      .save()
      .then(() => {
        res.status(200).json({
          message: "User created successfully!",
          data: name
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err
        });
      });
  };

  exports.createFilm = async (req, res) => {
    const { title, director, releaseYear, genre, duration, language } = req.body;
  
    const film = new Film({
        title, 
        director, 
        releaseYear, 
        genre, 
        duration, 
        language
    });
    film
      .save()
      .then(() => {
        res.status(200).json({
          message: "Film created successfully!",
          data: title
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err
        });
      });
  };
