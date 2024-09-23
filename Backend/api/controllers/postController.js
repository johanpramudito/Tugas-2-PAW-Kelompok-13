const bcrypt = require('bcryptjs');
const User = require("../models/User");
const Film = require("../models/Film");

// Create User (Sign Up)
exports.createUser = async (req, res) => {
    const { name, gender, phone, email, password, address, dateOfBirth } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email }); // Use req.body.email

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const user = new User({
            name,
            gender,
            phone,
            email,
            password: hashedPassword,  // Store the hashed password
            address,
            dateOfBirth
        });

        // Save the user to the database
        await user.save();

        res.status(200).json({
            message: "User created successfully!",
            data: { name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// Create Film
exports.createFilm = async (req, res) => {
    const { title, director, releaseYear, genre, duration, language, rating, image } = req.body;

    try {
        const film = new Film({
            title,
            director,
            releaseYear,
            genre,
            duration,
            language,
            rating,
            image
        });

        await film.save();

        res.status(200).json({
            message: "Film created successfully!",
            data: title
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// Login User (Sign In)
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful!",
            data: { name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};
