const {Router} = require('express');
const {recipeAddNormal, recipeAddOnline, recipeRetrieve} = require('../../../controller/userRecipesController');
const {recipeController} = require('../../../controller/recipeController');
const {authenticate} = require('../../../middleware/authen')

let recipe = Router();
recipe.post('/add_normal', recipeAddNormal);
recipe.post('/add_online', recipeAddOnline);
recipe.post('/retrieve', recipeRetrieve);
recipe.post('/search', recipeController);

module.exports = recipe;