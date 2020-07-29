const Trip = require('../models/Trip.model')

module.exports = {

    allTrips: (req,res) => {
        Trip.find({})
            .then(data => res.json({ message: "success", results: data}))
            .catch(err => res.json({ message: "error", results: err}))
    },
    oneTrip: (req,res) => {
        Trip.findOne({ _id: req.params.id})
            .then(data => res.json({ message: "success", results: data}))
            .catch(err => res.json({ message: "error", results: err}))
    },
    newTrip: (req,res) => {
        Trip.create(req.body)
            .then(data => res.json({ message: "success", results: data}))
            .catch(err => res.json({ message: "error", results: err}))
    },
    addFlight: (req,res) => {
        Trip.findOne({ _id: req.params.id })
            .then(data =>{
                data.flights.push(req.body);
                data.save();
                res.json({ message: "success", results: data})
            })
            .catch(err => res.json({ message: "error", results: err}))
    },
    deleteTrip: (req,res) => {
        Trip.findOneAndDelete({ _id: req.params.id })
            .then(data => res.json({ message: "success", results: data}))
            .catch(err => res.json({ message: "error", results: err}))
    },
    editTrip: (req,res) => {
        Trip.findOneAndUpdate({ _id: req.params.id}, req.body, {runValidators: true, new: true})
        .then(data => res.json({ message: "success", results: data}))
        .catch(err => res.json({ message: "error", results: err}))
    }

}