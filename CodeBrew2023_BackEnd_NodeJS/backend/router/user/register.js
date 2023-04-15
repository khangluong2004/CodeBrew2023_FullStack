const {Router} = require('express');
const {registerController} = require('../../controller/accController');

const register = Router();
register.post('/', registerController);

module.exports = register;