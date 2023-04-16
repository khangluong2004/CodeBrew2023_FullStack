const mongoose = require('mongoose');


const RecipeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    normal: [{
        name: String,
        ingredients: [{
            type: String
        }],
        instructions: {
            type: String
        },
        pricePerServing: Number
    }],
    online: [{
        name: String,
        image: String,
        sourceUrl: String,
        summary: String,
        pricePerServing: Number
    }]
})


const UserRecipes = mongoose.model('userRecipes', RecipeSchema);

module.exports = UserRecipes;

// test = async() => {
//     const new_userRecipes = new UserRecipes({
//         username: "CodeBruh",
//         normal: [
//             {
//                 ingredients: ["milk", "chicken", "juice"],
//                 instructions: "Boil it"
//             },
//             {
//                 ingredients: ["butter", "beef", "salt"],
//                 instructions: "Pan fry"
//             },
//         ],
//         online: [
//             {
//                 image: "abc.png",
//                 sourceUrl: "source.html",
//                 summary: "Haha",
//                 pricePerServing: 15.0
//             },
//             {
//                 image: "abcde.png",
//                 sourceUrl: "source2.html",
//                 summary: "Delicious",
//                 pricePerServing: 17.0
//             }
//         ]
//     })
//     await new_userRecipes.save(); 
//     console.log('done recipe');
// }

// try{
//     test();
// }catch(e){
//     console.log(e);
// }