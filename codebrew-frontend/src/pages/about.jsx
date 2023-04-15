import "./about.css";
import {Link} from "react-router-dom";
import Footer from "../components/footer.jsx";

export default function About() {
    return <div className="about-page">
        <div className="about-slide about-slide-1">
            <div>
                <h1 className="cb-big-title">About Us</h1>
                <h3 className="cb-big-subtitle">
                    <ul>
                        <li>
                            Welcome to Frugalicious

                        </li>
                        <li>
                            We are a website that provides a user-friendly groceries cost
                            calculator specifically designed for students on a tight budget.

                        </li>
                        <li>
                            We believe that everyone should have access to healthy, affordable
                            food, and we are committed to helping students achieve that.

                        </li>
                    </ul>
                </h3>
            </div>
        </div>
        <div className="about-slide about-slide-2">
            <div style={{width: '2000px', marginLeft: '15%'}}>
                <img src="/backgrounds/last.png" style={{width: '100%', height: 'auto'}} />
            </div>
        </div>
        <div className="about-slide about-slide-3">
            <div>
                <Link to="/register"
                      className="cb-link cb-button cb-button--outline">
                    GET STARTED
                </Link>
                <Footer/>
            </div>
        </div>
    </div>
}