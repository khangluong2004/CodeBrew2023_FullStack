// require('dotenv').config();
const Logger = require('../utils/logger');
const {validate_token} = require('../services/acc_operations');

const authenticate = async(req, res, next) => {
    try {
        const {token} = req.header;
        const check = await validate_token(token);
        if (!check){
            throw new Error("Unauthenticated");
        }
        next()
    } catch(e) {
        Logger.error(e);
        res.status(400).send();
    }
}


module.exports = {
    authenticate
};