const bcrypt = require('bcryptjs');
const User = require("../models/User");
const Film = require("../models/Film");

// Update User
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, gender, phone, email, password, address, dateOfBirth } = req.body;

    try {
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // If password is provided, hash it
        if (password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }

        // Update the other fields
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.phone = phone || user.phone;
        user.email = email || user.email;
        user.address = address || user.address;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: "User updated successfully!",
            data: { name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// Update Film
exports.updateFilm = async (req, res) => {
    const { id } = req.params;
    const { title, director, releaseYear, genre, duration, language } = req.body;

    try {
        // Check if film exists
        const film = await Film.findById(id);
        if (!film) {
            return res.status(404).json({ message: "Film not found!" });
        }

        // Update the fields
        film.title = title || film.title;
        film.director = director || film.director;
        film.releaseYear = releaseYear || film.releaseYear;
        film.genre = genre || film.genre;
        film.duration = duration || film.duration;
        film.language = language || film.language;

        // Save the updated film
        await film.save();

        res.status(200).json({
            message: "Film updated successfully!",
            data: { title: film.title }
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};
