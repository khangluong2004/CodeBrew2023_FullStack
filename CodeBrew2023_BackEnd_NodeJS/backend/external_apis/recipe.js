// Food data central
const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();



const get_recipe = async({query = "", diet = "", intolerance = "", direction = "asc"}) => {
    let recipes = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
        params: {
            apiKey: process.env.SPOON_RECIPE_KEY,
            addRecipeInformation: true,
            sort: "price",
            sortDirection: direction,
            query: query,
            diet: diet,
            intolerance: intolerance,
            number: 5
        }
    });
    return(recipes.data.results);
}


module.exports = get_recipe;