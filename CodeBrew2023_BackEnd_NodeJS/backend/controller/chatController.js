const {chat_post, chat_recipe_post, chat_retrieve_post, chat_retrieve_recipe} = require("../services/chat_operations");
const template = require('./template');

const chatPostController = template(async(req) => {
    const result = await chat_post(req.body);
    return(result);
}, 500);

const chatRecipePostController = template(async(req) => {
    const result = await chat_recipe_post(req.body);
    return(result);
}, 500);

const chatRetrievePostController = template(async(req) => {
    const result = await chat_retrieve_post(req.body);
    return(result);
}, 500);

const chatRetrieveRecipeController = template(async(req) => {
    const result = await chat_retrieve_recipe(req.body);
    return(result);
}, 500);


module.exports =  {
    chatPostController,
    chatRecipePostController,
    chatRetrievePostController,
    chatRetrieveRecipeController
}