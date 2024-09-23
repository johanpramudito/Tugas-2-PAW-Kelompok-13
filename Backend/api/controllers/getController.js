const Film = require('../models/Film');
const User = require('../models/User');

// Get all films dengan sorting release year opsional
/*exports.getAllFilms = async (req, res) => {
  try {
    const { sort } = req.query;
    
    const sortOrder = sort === 'desc' ? -1 : 1; // 1 untuk ascending, -1 untuk descending
    const films = await Film.find({}).sort({ releaseYear: sortOrder });

    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

exports.getFilms = async (req, res) => {
  try {
    const { sort, genre, title } = req.query;
    const sortOrder = sort === 'desc' ? -1 : 1; // Set sort order based on query

    let query = {};

    // If genre is provided, filter by genre
    if (genre) {
      query.genre = { $regex: new RegExp(genre, 'i') }; // Case-insensitive search
    }

    // If title is provided, filter by title
    if (title) {
      query.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive search
    }

    // Fetch films based on the filters and apply sorting
    const films = await Film.find(query).sort({ releaseYear: sortOrder });

    if (films.length === 0) {
      return res.status(404).json({ message: 'Tidak ada data ditemukan.' });
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
