const {productInfo, productList} = require("../services/products_operations");
const template = require('./template');

const productListControlller = template(async(req) => {
    const result = await productList(req.body);
    return(result);
}, 500);

const productInfoControlller = template(async(req) => {
    const result = await productInfo(req.body);
    return(result);
}, 500);

module.exports =  {
    productListControlller,
    productInfoControlller
}