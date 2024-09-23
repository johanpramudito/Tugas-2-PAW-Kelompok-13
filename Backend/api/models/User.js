const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: [false, "Please enter 'Male' or 'Female'"],
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
        dateOfBirth: {
            type: Date,  
            required: [false, "Please enter your date of birth in the format YYYY-MM-DD."],
            validate: {
            validator: function(value) {
                const formattedDate = moment(value).format('YYYY-MM-DD');
                return moment(formattedDate, 'YYYY-MM-DD', true).isValid();
            },
            message: props => `${props.value} is not a valid date! Please use the format YYYY-MM-DD.`,
            },
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);