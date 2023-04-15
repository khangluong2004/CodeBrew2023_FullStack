const {Router} = require('express');
const {validateTokenController} = require('../../controller/accController');

const validate_token = Router();
validate_token.post('/', validateTokenController);

module.exports = validate_token;