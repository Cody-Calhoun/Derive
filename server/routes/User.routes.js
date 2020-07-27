const userCtl = require('../controllers/Users.controllers');

module.exports = app => {
    // Login Routes
    app.post('/api/users', userCtl.register);
    app.post('/api/users/login', userCtl.login)

}