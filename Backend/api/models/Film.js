const mongoose = require('mongoose');

const filmSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        releaseYear: {
            type: Number,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: [true, "Please enter the duration in minutes"],
        },
        language: {
            type: String,
            required: true
        
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },
        image: {
            type: String,
            required: [true, "Please provide the image URL"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Film', filmSchema);