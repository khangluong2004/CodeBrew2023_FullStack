const {Router} = require('express');
const login = require('./login');
const register = require('./register');
const validate_token = require('./validate_token');


const route = Router();

route.use('/login', login);
route.use('/register', register);
route.use('/validate_token', validate_token);

module.exports = route;