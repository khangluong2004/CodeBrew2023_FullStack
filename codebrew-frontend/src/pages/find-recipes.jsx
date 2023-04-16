import "./find-recipes.css";
import Select from 'react-select';
import Food from "../components/food.jsx";
import Footer from "../components/footer.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext, authPost} from "../lib/auth.js";

const SELECT_STYLES = {
    control: (base, state) => ({
        ...base,
        background: '#41644A',
        borderRadius: '15px',
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white'
    }),
    dropdownIndicator: base => ({
        ...base,
        color: "white",
        "&:hover": {
            color: 'white'
        }
    })
};

const SELECT_THEME = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#eee',
        primary: '#41644A',
    },
});

export default function FindRecipes() {

    const [query, setQuery] = useState('');
    const [diet, setDiet] = useState('');
    const [intol, setIntol] = useState('');
    const [price, setPrice] = useState('asc');

    const [recipes, setRecipes] = useState([]);
    const {auth} = useContext(AuthContext);
    const fetchRecipes = async () => {
        // try {
        //     const json = await authPost(
        //         '/recipe/retrieve',
        //         {
        //             username: auth.username
        //         }
        //     );
        //
        //     const recipes = json.data.online.map((entry, i) => ({
        //         name: 'Recipe ' + (i+1),
        //         image: entry.image,
        //         source: entry.sourceUrl,
        //         summary: entry.summary,
        //         price: entry.pricePerServing,
        //     }));
        //     setRecipes(recipes);
        // } catch (err) {
        //     console.log('error fetching recipes');
        // }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const addRecipe = async id => {
        try {
            const product = recipes[id];
            await authPost(
                '/recipe/add_online',
                {
                    username: auth.username,
                    image: product.image,
                    sourceUrl: product.source,
                    summary: product.summary,
                    pricePerServing: product.price
                }
            );
        } catch (err) {
            console.log('error adding recipe');
        }
    }


    const handleSearch = async event => {
        event.preventDefault();

        try {
            const result = await authPost(
                '/recipe/search',
                {
                    query: query,
                    diet,
                    intolerance: intol,
                    direction: price,
                }
            );

            const recipes = result.data.map(rec => ({
                name: rec.name,
                image: rec.image,
                summary: rec.summary,
                source: rec.sourceUrl,
                price: rec.pricePerServing
            }));
            setRecipes(recipes);
        } catch (err) {
            console.log('cannot fetch recipes');
        }
    }

    return <>
        <form className="find-search" onSubmit={handleSearch}>
            <input className="cb-input cb-input--outline find-searchbar"
                   placeholder="What's in Your Fridge?"
                   value={query}
                   onChange={e => setQuery(e.currentTarget.value)}/>

            <button type="submit" className="cb-button cb-button--icon cb-button--outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                Search
            </button>
        </form>
        <div className="find-page">
            <div className="find-filters">
                <Select
                    options={[
                        {value: '', label: 'All Menus'},
                        {value: 'Gluten Free', label: 'Gluten Free'},
                        {value: 'Ketogenic', label: 'Ketogenic'},
                        {value: 'Vegetarian', label: 'Vegetarian'},
                    ]}
                    defaultValue={{value: '', label: 'All Menus'}}
                    onChange={e => setDiet(e.value)}
                    theme={SELECT_THEME}
                    styles={SELECT_STYLES}/>

                <Select
                    defaultValue={
                        {value: '', label: 'No Intolerances'}
                    }
                    options={[
                        {value: '', label: 'No Intolerances'},
                        {value: 'Dairy', label: 'Dairy'},
                        {value: 'Peanut', label: 'Peanut'},
                        {value: 'Gluten', label: 'Gluten'},
                    ]}
                    onChange={e => setIntol(e.value)}
                    theme={SELECT_THEME}
                    styles={SELECT_STYLES}/>


                <Select
                    defaultValue={
                        {value: 'asc', label: 'Cheapest First'}
                    }
                    options={[
                        {value: 'asc', label: 'Cheapest First'},
                        {value: 'desc', label: 'Expensive First'},
                    ]}
                    onChange={e => setPrice(e.value)}
                    theme={SELECT_THEME}
                    styles={SELECT_STYLES}/>

            </div>

            <div className="find-recipes">
                {
                    recipes
                        .map((rec, id) => (
                            <Food
                                cost={rec.price}
                                nv={rec.summary}
                                url={rec.image}
                                source={rec.source}
                                name={rec.name}>
                                <div className="find-recipes-action">
                                    <button className="cb-button cb-button--outline"
                                            onClick={() => addRecipe(id)}>
                                        Add To Recipe
                                    </button>
                                </div>
                            </Food>
                        ))
                }
            </div>
        </div>
        <Footer/>
    </>
}