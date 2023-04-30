const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/register', userController.register);
    app.post('/login', userController.login);
    app.post('/logout', userController.logout);
    app.get('/api/current-user', userController.getLoggedInUser);
    app.get('/api/all-users', userController.findAllUsers);
    app.delete('/api/user/:id', userController.deleteUser);
};