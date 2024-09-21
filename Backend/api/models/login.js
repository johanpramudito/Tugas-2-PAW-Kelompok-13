const { default: mongoose } = require("mongoose");

//login schema
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});


const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;




