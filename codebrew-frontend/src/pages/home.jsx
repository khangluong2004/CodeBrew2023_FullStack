import "./home.css";
import {Link} from "react-router-dom";
import Footer from "../components/footer.jsx";

export default function Home() {
    return <div className="home-page">
        <div className="home-slide">
            <div>
                <h1 className="cb-fancy home-title">Frugalicious!</h1>
                <h3 className="cb-big-subtitle">
                    Cooking up savings with every meal
                </h3>
                <div>
                    <Link to="/register" className="cb-link cb-button cb-button--outline"
                       style={{minWidth: '200px'}}>
                        GET STARTED!
                    </Link>
                </div>

            </div>
        </div>
        <div className="home-slide home-slide-2">
            <div className="home-img">
                <img src="/backgrounds/home-2.png"/>
            </div>
            <div>
                <h1 className="cb-big-title">
                    Don't Ask Google. Ask Us!
                </h1>
                <h3 className="cb-big-subtitle">
                    Frugalicious! We compile a list of ingredients
                    <br/>
                    and their estimated costs on demand.
                </h3>
                <button className="cb-button cb-button--outline"
                        style={{minWidth: '200px'}}>
                    Find Out How Much Does Your Meal Cost?
                </button>
            </div>
        </div>
        <div className="home-slide home-slide-1">
            <div>
                <h1 className="cb-big-title">Designed to Make a Difference</h1>
                <h3 className="cb-big-subtitle">
                    Frugalicious! We generate a list of possible
                    <br/>
                    cheap and healthy meals from the selected
                    <br/>
                    ingredients for you.
                </h3>
                <button className="cb-button cb-button--outline"
                        style={{minWidth: '200px'}}>
                    Cheap and Healthy Recipes
                </button>
            </div>
            <div className="home-img">
                <img src="/backgrounds/calc%201.png"/>
            </div>
        </div>
        <div className="home-slide home-slide-2">
            <div className="home-img">
                <img src="/backgrounds/section2.png"/>
            </div>
            <div>
                <h1 className="cb-big-title">
                    Penny-pinchers? No.
                    <br/>
                    Economical consumers? Yes!
                </h1>
                <button className="cb-button cb-button--outline"
                        style={{minWidth: '200px'}}>
                    Join Our Community
                </button>
            </div>

        </div>

        <div className="home-footer">
            <Footer />
        </div>
    </div>
}