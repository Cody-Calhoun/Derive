const controller = require('../controllers/Flight.Controller')

module.exports = function(app){

    app.get('/api/trips', controller.allTrips);
    app.get('/api/trips/:id', controller.oneTrip);

    app.post('/api/trips', controller.newTrip);

    app.patch('/api/trips/:id', controller.editTrip);
    app.patch('/api/trips/:id/flight', controller.addFlight);

    app.delete('/api/trips/:id', controller.deleteTrip)
}