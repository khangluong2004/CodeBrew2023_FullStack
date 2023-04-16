const {getOne, updateEntry, create} = require("../repositories/index");
const  {userRecipes} = require("../model/index");

const recipe_add_normal = async({username, name, ingredients, instructions, pricePerServing}) => {
    try {
        let entry = await getOne(userRecipes, {username});
        if (!entry){
            await create(userRecipes, {
                username: username,
                normal: [{
                    name: name,
                    ingredients,
                    instructions,
                    pricePerServing
                }],
                online: []
            })
        }
        entry.normal.unshift({
            name,
            ingredients,
            instructions,
            pricePerServing
        });
        const updated = await updateEntry(userRecipes, {username}, entry);
        console.log(updated);
        return(true);
    } catch (e) {
        return(false);
    }
}

const recipe_add_online = async({username, name, image, sourceUrl, summary, pricePerServing}) => {
    try {
        let entry = await getOne(userRecipes, {username});
        if (!entry){
            await create(userRecipes, {
                username: username,
                normal: [],
                online: [{
                    name,
                    image,
                    sourceUrl,
                    summary,
                    pricePerServing
                }]
            })
        }
        entry.online.unshift({
            image,
            name,
            sourceUrl,
            summary,
            pricePerServing
        });
        const updated = await updateEntry(userRecipes, {username}, entry);
        console.log(updated);
        return(true);
    } catch (e) {
        return(false);
    }
}

const recipe_retrieve = async({username}) => {
    const entry = await getOne(userRecipes, {username});
    if (!entry){
        return({
            online: [],
            normal: []
        });
    }
    console.log({
        online: entry.online,
        normal: entry.normal
    });
    return({
        online: entry.online,
        normal: entry.normal
    });
}


module.exports = {
    recipe_add_normal,
    recipe_add_online,
    recipe_retrieve
}