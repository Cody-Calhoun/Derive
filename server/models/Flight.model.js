const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    num: {
        type: String,
        required: [true, "This field is required"],
    },
    airline: {
        type: String,
        required: [true, "This field is required"],
    },
    status: {
        type: String,
        required: [true, "This field is required"],
    },
    date: {
        type: String,
        required: [true, "This field is required"],
    },
    departure: {
        type: String,
        required: [true, "This field is required"],
    },
    arrival: {
        type: String,
        required: [true, "This field is required"],
    }

})

module.exports = FlightSchema;