import './cost.css';
import Footer from "../components/footer.jsx";
import {useContext, useEffect, useMemo, useState} from "react";
import {AuthContext, authPost} from "../lib/auth.js";
import classNames from "classnames";
import Modal from "../components/modal.jsx";

const MOCK_PRODUCTS = [
    {
        name: 'Chicken',
        price: 0.86,
        amount: 5,
        unit: 'kg'
    },
    {
        name: 'Milk',
        price: 0.86,
        amount: 100,
        unit: 'ml'
    },
    {
        name: 'OJ',
        price: 0.86,
        amount: 100,
        unit: 'ml'
    },
    {
        name: 'OJ',
        price: 0.86,
        amount: 100,
        unit: 'ml'
    },
    {
        name: 'OJ',
        price: 0.86,
        amount: 100,
        unit: 'ml'
    },
]

const MOCK_LIST = [
    {
        id: 0,
        name: "milk",
        unit: "kg",
        quantity: 12,
        price: 6.5,
        value: {
            protein: '12g',
            energy: '120kJ',
            sugar: '0g'
        },
    }
]
export default function Cost() {

    /// dropdown products & searching functionality
    const [products, setProducts] = useState(
        []
    );
    const [filter, setFilter] = useState('');
    const filteredProducts = useMemo(() => {
        const f = filter.trim().toLowerCase();
        if (f === '') {
            return products;
        }

        return products
            .map((p, id) => ({...p, id}))
            .filter(p => p.name.toLowerCase().includes(f));
    }, [filter]);
    const [quantity, setQuantity] = useState('');

    /// product selection
    const [selected, setSelected] = useState(null);
    const selectedMeasure = useMemo(() => {
        if (selected == null)
            return '';

        const product = products[selected];
        return product.unit;
    }, [selected, products]);
    const [retrieving, setRetrieving] = useState(false);

    const selectProduct = id => {
        setSelected(id);
        setQuantity(products[id].amount);
    }

    /// list functions
    const [list, setList] = useState([]);
    const [listDetail, setListDetail] = useState(null);

    const toggleListDetail = id => {
        if (listDetail === id) {
            setListDetail(null);
        } else {
            setListDetail(id);
        }
    }

    /// components
    const dropdown = useMemo(() => {
        if (filter.trim().length === 0) {
            return <></>
        }

        return <div className="cb-card cost-dropdown">
            {
                filteredProducts.map(({name, price, amount, unit, id}) => (
                    <a className={classNames("cost-dropdown-entry", {
                        "cost-dropdown-entry--active": id === selected
                    })}
                       key={id}
                       onClick={() => selectProduct(id)}>
                        <h3>{name}</h3>
                        <span>${price}/{(amount === 1 ? '' : amount)}{unit}</span>
                    </a>
                ))
            }
        </div>;
    }, [filter, selected]);
    const listTableStats = useMemo(() => {
        if (list.length === 0)
            return <></>;

        const totalPrice = list.map(product => product.price).reduce((x, acc) => x + acc, 0);
        return <tr className="details-total">
            <td></td>
            <td>Total</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td>total nut value</td>
        </tr>

    }, [list]);
    const briefNut = nut => {
        return Object.entries(nut).map(([key, value]) => key + ': ' + value).join(', ');
    }
    const listTable = useMemo(() => {
        if (list.length === 0) {
            return <></>
        }


        return <div className="cost-details">
            <table className="cost-details-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Nutrition Values</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map(({id, name, quantity, unit, price, value}, key) => (
                        <tr className="cost-details-entry" key={key}>
                            <td className="details-delete-container">
                                <a className="cb-link details-delete" onClick={() => handleListDelete(key)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </a>
                            </td>
                            <td className="details-title">
                                  <span>
                                    {name} {quantity}{unit}
                                  </span>
                            </td>
                            <td className="details-price">
                                <span>${price.toFixed(2)}</span>
                            </td>
                            <td className="details-nut"
                                onClick={() => toggleListDetail(id)}>

                                <span className="details-nut-text">
                                    {
                                        listDetail === id ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-caret-down-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-caret-right-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        )
                                    }

                                    {listDetail !== id && briefNut(value)}
                                </span>
                                {
                                    listDetail === id && (
                                        <table className="details-nut-dropdown">
                                            {
                                                Object.entries(value).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td>{value}</td>
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    )

                                }
                            </td>

                        </tr>
                    ))
                }
                {listTableStats}
                </tbody>
            </table>

        </div>
    }, [list, listDetail]);

    /// list modifications
    const handleAdd = async () => {
        if (selected == null) {
            alert('No products selected');
            return;
        }

        const product = products[selected];

        const CONF_DICT = {
            'kg': 1000,
            'l': 1000,
        }
        let trueQuantity = quantity;
        if (CONF_DICT[product.unit]) {
            trueQuantity *= CONF_DICT[product.unit];
        }

        const body = {
            name: product.name,
            quantity: trueQuantity,
        };
        const price = (quantity / product.amount * product.price);

        // /products/info
        try {
            setRetrieving(true);
            const json = await authPost(
                '/products/info',
                body
            );

            // add to list
            let values = [];
            for (const [key, value] of Object.entries(json)) {
                values[key] = `${value.amount.toFixed(2)}${value.unit}`;
            }

            setList(
                [
                    ...list,
                    {
                        id: selected,
                        name: product.name,
                        unit: product.unit,
                        quantity,
                        price: price,
                        value: values,
                    }
                ]
            );
        } catch (err) {
            console.log('failed to retrieve info');
        } finally {
            setQuantity('');
            setSelected(null);
            setRetrieving(false);
            setFilter('');
        }


    }

    const handleListDelete = key => {
        setList(
            list.filter((l, id) => id !== key)
        );
    }

    /// on start
    const retrieveProducts = async () => {
        try {
            const json = await authPost(
                '/products/list',
                {}
            );
            setProducts(
                json.map(product => ({
                    name: product.product,
                    price: product.price,
                    amount: product.quantity,
                    unit: product.unit
                }))
            );
        } catch (err) {
            console.log('failed to retrieve products');
        }
    }
    useEffect(() => {
        retrieveProducts();
        // selectProduct(1);
        // setTimeout(() => {
        //     handleAdd();
        // }, 100);
    }, []);


    const [recipeName, setRecipeName] = useState('');
    const [recipeInstr, setRecipeInstr] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const {auth} = useContext(AuthContext);
    const handleSave = async () => {
        if (!recipeName || !recipeInstr) {
            alert('please enter a recipe name and instructions');
            return;
        }

        // save
        try {

            const totalPrice = list.map(l => l.price).reduce((x, acc) => x + acc, 0);
            await authPost(
                '/recipe/add_normal',
                {
                    username: auth.username,
                    ingredients: list.map(l => l.name),
                    instructions: recipeInstr,
                    name: recipeName,
                    pricePerServing: totalPrice
                }
            );

            setRecipeName('');
            setRecipeInstr('');
            setModalOpen(false);
        } catch (err) {
            console.log('cannot save recipes');
        }
    }

    return <div className="cost-page">
        <h1 className="cb-page-title">Cost Calculator</h1>

        <div className="cost-box">
            <div className="cost-search">
                <div className="cb-card cost-ing">
                    <h3 className="cb-card-title">Ingredients</h3>
                    <input placeholder="Search Items" className="cb-input"
                           disabled={retrieving}
                           value={filter}
                           onChange={e => setFilter(e.currentTarget.value)}/>
                </div>
                <div className="cb-card cost-search-others">
                    <div className="cost-search-entry">
                        <h3 className="cb-card-title">Quantity</h3>
                        <input placeholder="Add Values"
                               className="cb-input"
                               disabled={retrieving}
                               value={quantity}
                               onChange={e => setQuantity(e.currentTarget.value)}/>
                    </div>
                    <div className="cb-card-hline">

                    </div>
                    <div className="cost-search-entry">
                        <h3 className="cb-card-title">Measures</h3>
                        <input placeholder="Units" className="cb-input"
                               disabled
                               value={selectedMeasure}/>
                    </div>

                    <div className='cost-search-container'>
                        <button className="cb-button cb-button--outline cost-search-btn"
                                onClick={handleAdd}
                                disabled={retrieving}>
                            {
                                retrieving
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                        <path
                                            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                        <path fill-rule="evenodd"
                                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-search" viewBox="0 0 16 16">
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                            }
                            Add
                        </button>
                    </div>
                </div>

            </div>
            {dropdown}
            {listTable}
        </div>

        <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
            <div className="cost-modal">
                <input placeholder="Recipe Name..."
                       className="cb-input cost-modal-title"
                       value={recipeName}
                       onChange={e => setRecipeName(e.currentTarget.value)}/>
                <div>
                    <h1>Ingredients</h1>
                    <ul>
                        {
                            list.map((item, key) => (
                                <li key={key}>{item.name}</li>
                            ))
                        }
                    </ul>
                    <hr/>
                    <h1>Instructions</h1>
                    <textarea className="cb-textinput cost-modal-instructions"
                              placeholder={`This is how I prepare ${recipeName}...`}
                              value={recipeInstr}
                              onChange={e => setRecipeInstr(e.currentTarget.value)}>

                    </textarea>
                    <div className="cost-modal-save">
                        <button className="cb-button"
                                onClick={handleSave}>
                            Save To Recipes
                        </button>
                        <button className="cb-button"
                                onClick={handleSave}>
                            Post To Community
                        </button>
                        <button className="cb-button cb-button--outline"
                                onClick={() => setModalOpen(false)}>
                            I'm not finished
                        </button>
                    </div>
                </div>

            </div>
        </Modal>
        <div className="cost-actions">
            <button className="cb-button cb-button--outline"
                    onClick={() => setModalOpen(true)}>
                I Finished
            </button>
            {/*<button className="cb-button cb-button--outline">*/}
            {/*    Post This Recipe*/}
            {/*</button>*/}
        </div>

        <Footer/>
    </div>
}