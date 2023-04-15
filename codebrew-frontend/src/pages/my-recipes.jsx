import "./my-recipes.css";
import {useContext, useEffect, useState} from "react";
import Recipe from "../components/recipe.jsx";
import Footer from "../components/footer.jsx";
import {AuthContext, authPost} from "../lib/auth.js";
import Food from "../components/food.jsx";

const MOCK_RECIPES = [
    {
        name: 'test1',
        ingredients: [
            'milk',
            'what'
        ],
        cost: 12
    },
    {
        name: 'test1',
        ingredients: [
            'milk',
            'what'
        ],
        cost: 12
    },
    {
        name: 'test1',
        ingredients: [
            'milk',
            'what'
        ],
        cost: 12
    },{
        name: 'test1',
        ingredients: [
            'milk',
            'what'
        ],
        cost: 12
    },
    {
        name: 'test1',
        ingredients: [
            'milk',
            'what'
        ],
        cost: 12
    },
    {
        name: 'test1',
        ingredients: [
            'milk',
            'what'
        ],
        cost: 12
    }
]

export default function MyRecipes() {

    const [recipes, setRecipes] = useState([]);
    const [onlineRecipes, setOnlineRecipes] = useState([]);
    const {auth} = useContext(AuthContext);
    const fetchRecipes = async () => {
        try {
            const json = await authPost(
                '/recipe/retrieve',
                {
                    username: auth.username
                }
            );

            const recipes = json.data.normal.map((entry, i) => ({
                name: 'Recipe ' + (i+1),
                ingredients: entry.ingredients,
                instructions: entry.instructions,
                cost: 69.420
            }));
            const recipesOnline = json.data.online.map((entry, i) => ({
                name: 'Recipe',
                image: entry.image,
                source: entry.sourceUrl,
                summary: entry.summary,
                price: entry.pricePerServing,
            }));

            setRecipes(recipes);
            setOnlineRecipes(recipesOnline);
        } catch (err) {
            console.log('error fetching recipes');
        }
    };

    useEffect(() => {
      fetchRecipes();
    }, []);

    const postRecipe = async id => {
        const recipe = recipes[id];
        try  {
            const isFine = await authPost(
                '/chat/recipe_post',
                {
                    username: auth.username,
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    likes: 0
                }
            );

            if (!isFine) {
                alert('post is toxic, please retry');
            }
        } catch (err) {
            console.log('failed to post recipe');
        }
    }

    return <div className="recipes-page">
        <h1 className="cb-page-title">My Recipes</h1>
        <div className="recipes-my">
            {
                recipes.map((rec, id) => (
                    <Recipe {...rec}>
                        <p style={{flexGrow: 2}}>{rec.instructions}</p>
                        <div>
                            <button className="cb-button cb-button--outline"
                                    style={{float: 'right'}}
                                    onClick={() => postRecipe(id)}>
                                Post
                            </button>
                        </div>
                    </Recipe>
                ))
            }
            {
                onlineRecipes
                    .map((rec, id) => (
                        <Food
                            cost={rec.price}
                            nv={rec.summary}
                            url={rec.image}
                            name={rec.name}
                            source={rec.source}/>
                    ))
            }
        </div>
        <Footer />
    </div>
}