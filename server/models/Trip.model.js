const mongoose = require('mongoose');
const FlightSchema = require("./Flight.model");

const TripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "This field is required"],
        minlength: [5, "Title must be at keast 5 characters."]
    },
    description: {
        type: String,
        required: [true, "This field is required"],
        minlength: [5, "Title must be at keast 5 characters."]
    },
    startDate: {
        type: Date,
        min: [new Date(), "Date must be in the future."]
    },
    endDate:{
        type: Date,
        min: [new Date(), "Date must be in the future."]
    },
    flights : [FlightSchema]
}, {timestamps: true})

const Trip = new mongoose.model('Trip', TripSchema);

module.exports.Trip = Trip
module.exports.TripSchema = TripSchema;