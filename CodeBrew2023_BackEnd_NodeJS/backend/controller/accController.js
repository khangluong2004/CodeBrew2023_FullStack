const { login, register, validate_token } = require('../services/acc_operations');
const template = require('./template');

const registerController = template(async(req) => {
    await register(req.body);
    return {data: true};
}, 401)

const loginController = template(async(req) => {
    const token = await login(req.body);
    return {token};
}, 401)

const validateTokenController = template(async(req) => {
    const valid = await validate_token(req.body.token);
    return {data: valid}
}, 401)



module.exports =  {
    loginController,
    registerController,
    validateTokenController
}