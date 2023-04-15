const {Router} = require('express');
const recipe = require('./recipe/search_add_and_retrieve');
const products = require('./products/products_route');
const chat = require('./chat/chat_post_retrieve');

const route = Router();

route.use('/recipe', recipe);
route.use('/products', products);
route.use('/chat', chat)

module.exports = route;