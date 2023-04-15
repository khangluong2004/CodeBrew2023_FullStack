const {Router} = require('express');
const {loginController} = require('../../controller/accController');

const login = Router();
login.post('/', loginController);

module.exports = login;