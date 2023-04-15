//Load .env variables
//require('dotenv').config();
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String,
        uppercase: true
    },
    brand: {
        type: String,
        uppercase: true
    }
})


const Product = mongoose.model('products', ProductSchema);

module.exports = Product;

// test = async() => {
//     for (let i = 0; i < list.length; i++){
//         let new_product = new Product({...list[i], brand: "Woolworth"});
//         await new_product.save();
//     }
//     console.log('done');
// }

// try{
//     test();
// }catch(e){
//     console.log(e);
// }
