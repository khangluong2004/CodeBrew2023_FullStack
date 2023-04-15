import "./navbar.css";
import icon from '../assets/react.svg';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../lib/auth.js";

export default function Navbar() {
    const {auth} = useContext(AuthContext);

    return <div className="navbar">
        <Link className="cb-link cb-fancy navbar__title" to="/">
            Frugalicious!
        </Link>

        <div className="navbar__action navbar__links">
            <Link to="/about" className="cb-link navbar__action--link">About</Link>
            {
                auth.authenticated && <>
                    <Link to="/calculator" className="cb-link navbar__action--link">Cost Calculator</Link>
                    <Link to="/recipes" className="cb-link navbar__action--link">My Recipes</Link>
                    <Link to="/find" className="cb-link navbar__action--link">Find Recipes</Link>
                    <Link to="/community" className="cb-link navbar__action--link">Community</Link>
                </>
            }

        </div>
        <div className="navbar__spacer"></div>
        <div className="navbar__action navbar__auth">
            {
                auth.authenticated
                    ? <Link to="/logout" className="cb-link cb-button">Log Out</Link>
                    : <>
                        <Link to="/login" className="cb-link cb-button">LOGIN</Link>
                        <Link to="/register" className="cb-link cb-button cb-button--outline">SIGN UP</Link>
                    </>
            }
        </div>
    </div>
}
