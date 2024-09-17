const Film = require('../models/Film');
const User = require('../models/User');

// Get all films
exports.getAllFilms = async (req, res) => {
  try {
    const films = await Film.find({});
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get film by title
exports.getFilmByTitle = async (req, res) => {
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
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by name
exports.getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name: { $regex: new RegExp(name, 'i') } }); // biar kapital engganya ga berpengaruh

    if (!user) {
      return res.status(404).json({ message: `User with name ${name} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
