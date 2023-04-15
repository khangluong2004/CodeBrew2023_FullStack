const {Router} = require('express');
const {productInfoControlller, productListControlller} = require('../../../controller/productsController');
const {authenticate} = require('../../../middleware/authen')

let products_route = Router();
products_route.post('/list', productListControlller);
products_route.post('/info', productInfoControlller);

module.exports = products_route;