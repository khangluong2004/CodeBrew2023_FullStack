// Food data central
const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();

const get_nutrients_per_input = async (query, input_mass) => {
    const displayed_types = ['Water', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 
    'Sugars, total including NLEA', 'Fiber, total dietary', 'Cholesterol', 'Fatty acids, total saturated', 'Fatty acids, total monounsaturated', 'Fatty acids, total polyunsaturated',
    'Vitamin A, RAE', 'Vitamin E (alpha-tocopherol)', 'Vitamin D (D2 + D3)', 'Vitamin C, total ascorbic acid', 'Vitamin B-6', 'Vitamin B-12', 'Calcium, Ca', 'Iron, Fe']

    const conversion = {
        "UG": 10 ** -6,
        "MG": 10 ** -3,
        "G": 1,
        "KG": 10 ** 3
    }

    const mass = ["UG", 'MG', 'G', 'KG']

    let nutrients_types = {};
    let raw = await axios.get("https://api.nal.usda.gov/fdc/v1/foods/search", {
        params: {
            api_key: process.env.FOOD_CENTRAL_KEY,
            query: query,
            pageSize: 10,
            pageNumber: 1
        }
    });
    general_info = raw.data.foods;
    general_info.sort((p1, p2) => {
        if (p1.score < p2.score){
            return(1)
        } else if (p1.score == p2.score) {
            return(0)
        } else {
            return(-1)
        }
    });
    
    // console.log(general_info[0]);
    // console.log(general_info[0].foodMeasures);
    // console.log(general_info[0].finalFoodInputFoods.length);
    let quantity = 0.0;
    nutrients = general_info[0].foodNutrients;
    for (let i = 0; i < nutrients.length; i++){
        if (displayed_types.includes(nutrients[i].nutrientName)){
            nutrients_types[nutrients[i].nutrientName] = {amount: parseFloat(nutrients[i].value), unit: nutrients[i].unitName};
        }
        if (mass.includes(nutrients[i].unitName)){
            quantity = quantity + parseFloat(nutrients[i].value) * conversion[nutrients[i].unitName];
        }
    }
    for (let prop in nutrients_types){
        nutrients_types[prop] = {amount: nutrients_types[prop]["amount"] / quantity * input_mass, unit: nutrients_types[prop]["unit"]};
    }
    //Nutrient types per gram
    return(nutrients_types);
}

module.exports = {get_nutrients_per_input};

// Check structure of db. Apparently there is none.
    // if (measures.length != 0){
    //     for (let x = 0; x < measures.length; x++){
    //         if (measures[x].disseminationText == 'Quantity not specified'){
    //             quantity = measures[x].gramWeight;
    //             unit = "g";
    //         }
    //     }
    //      //Where to find gramWeight of total. Scale to input
    // } else {
    //     quantity = general_info[0].servingSize; 
    //     unit = general_info[0].servingSizeUnit;
    // }