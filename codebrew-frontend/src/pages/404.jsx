import './404.css';
import {Link} from "react-router-dom";
import Footer from "../components/footer.jsx";

export default function Error() {
    return <>
        <div className="error-page">
            <div>
                <h1>404 Not Found</h1>
                <div>
                    <Link to="/" className="cb-link">Go Back</Link>
                </div>
            </div>
        </div>
        <Footer/>
    </>
}