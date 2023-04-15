//require('dotenv').config();
const Logger = require('../utils/logger');

const template = (mainFunc, error_code = 400) => async(req, res) => {
    try {
        const val = await mainFunc(req);
        Logger.info(val);
        res.status(201).send(val)
    } catch(e){
        Logger.error(e);
        res.status(error_code).send();
    }
};


module.exports = template