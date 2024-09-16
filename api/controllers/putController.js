const User = require("../models/User");
const Film = require("../models/Film");

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, gender, phone, email, address, dateOfBirth } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, gender, phone, email, address, dateOfBirth },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found!"
      });
    }

    res.status(200).json({
      message: "User updated successfully!",
      data: user
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
};

exports.updateFilm = async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseYear, genre, duration, language } = req.body;

  try {
    const film = await Film.findByIdAndUpdate(
      id,
      { title, director, releaseYear, genre, duration, language },
      { new: true, runValidators: true }
    );

    if (!film) {
      return res.status(404).json({
        message: "Film not found!"
      });
    }

    res.status(200).json({
      message: "Film updated successfully!",
      data: film
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
};
