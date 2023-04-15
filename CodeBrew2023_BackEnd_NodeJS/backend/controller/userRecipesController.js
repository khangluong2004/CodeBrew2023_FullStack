const {recipe_add_normal, recipe_add_online ,recipe_retrieve} = require("../services/user_recipe_operations");
const template = require('./template');

const recipeAddNormal = template(async(req) => {
    await recipe_add_normal(req.body);
    return {data: true};
}, 500);

const recipeAddOnline = template(async(req) => {
    await recipe_add_online(req.body);
    return {data: true};
}, 500);

const recipeRetrieve = template(async(req) => {
    const result = await recipe_retrieve(req.body);
    return {data: result};
}, 500)

module.exports = {
    recipeAddNormal,
    recipeAddOnline,
    recipeRetrieve
}