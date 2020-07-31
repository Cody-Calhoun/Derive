const userCtl = require('../controllers/Users.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    // Login Routes
    app.post('/api/users', userCtl.register);
    app.post('/api/users/login', userCtl.login);
// this authenticate is for us to dictate who can see what.
    // app.get('/api/users', authenticate, userCtl.getAll)
    app.get('/api/user/:id', userCtl.getUser)
    app.delete('/api/users/logout', userCtl.logout);

}