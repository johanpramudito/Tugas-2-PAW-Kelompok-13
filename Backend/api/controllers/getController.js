const Film = require('../models/Film');
const User = require('../models/User');

// Get all films with optional sorting by release year
exports.getAllFilms = async (req, res) => {
  try {
    // Extract the sorting order from query parameters
    const { sort } = req.query;
    
    // Define sorting order: 1 for ascending, -1 for descending
    const sortOrder = sort === 'desc' ? -1 : 1;

    // Fetch films and sort by releaseYear if available
    const films = await Film.find({}).sort({ releaseYear: sortOrder });

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

// Get films by genre
exports.getFilmsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const films = await Film.find({ genre: { $regex: new RegExp(genre, 'i') } }); // pencarian genre tidak case-sensitive

    if (films.length === 0) {
      return res.status(404).json({ message: `No films found in genre ${genre}` });
    }

    res.status(200).json(films);
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
