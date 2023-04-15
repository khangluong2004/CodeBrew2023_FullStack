import "./food.css";


export default function Food(
    {
        url,
        name,
        nv,
        cost,
        source,
        children
    }
) {
    return <div className="cb-card food-card">
        <div className="food-image">
            <a href={source} target="_blank">
                <img
                    src={url}
                    alt="food image"
                />
            </a>
        </div>
        <h1 className="cb-card-title food-title">
            {name}
        </h1>
        <div className="food-info">
            <span dangerouslySetInnerHTML={{
                __html: nv
            }}></span>
            <span>|</span>
            <span>${cost}</span>
        </div>
        {children}
    </div>
}