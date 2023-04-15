const {Router} = require('express');
const {chatPostController, chatRecipePostController, chatRetrievePostController, chatRetrieveRecipeController} = require('../../../controller/chatController');
const {authenticate} = require('../../../middleware/authen')

let chat_route = Router();
chat_route.post('/post', chatPostController);
chat_route.post('/recipe_post', chatRecipePostController);
chat_route.post('/retrieve_post', chatRetrievePostController);
chat_route.post('/retrieve_recipe', chatRetrieveRecipeController);

module.exports = chat_route;