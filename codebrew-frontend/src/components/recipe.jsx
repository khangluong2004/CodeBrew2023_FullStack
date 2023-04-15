import "./recipe.css";

export default function Recipe(
    {
        name,
        ingredients,
        cost,
        children
    }
) {
    return <div className="cb-card recipe-card">
        <h1 className="cb-card-title">
            {name}
            {
                cost && <span style={{float: 'right'}}>${cost.toFixed(2)}</span>
            }
        </h1>
        <hr/>
        <ul className="recipe-list">
            {
                ingredients.map((ing, key) => (
                    <li key={key}>
                        {ing}
                    </li>
                ))
            }
        </ul>
        {children}
    </div>
}