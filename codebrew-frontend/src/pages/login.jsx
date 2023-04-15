import "./login.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext, authLogin} from "../lib/auth.js";
import {Link, Navigate, redirect} from "react-router-dom";
import Footer from "../components/footer.jsx";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const {auth, setAuth} = useContext(AuthContext);

    const handleSubmit = async event => {
        event.preventDefault();

        // send login
        setError('');
        setIsFetching(true);

        try {
            const jwt = await authLogin({username, password});

            // save it
            setTimeout(() => {
                localStorage.setItem('auth_jwt', jwt);
                localStorage.setItem('auth_username', username);
                setAuth({username, authenticated: true});
            }, 100);

            // redirect to home
            setShouldRedirect(true);
        } catch (err) {
            setError(err);
        } finally {
            setIsFetching(false);
        }
    }


    return (
        <div className="login-page">
            {
                shouldRedirect && <Navigate to="/"/>
            }
            <div className="login-left">
                <div className="login-shift">
                    <h1 className="cb-form-title cb-title">Login to your account</h1>

                    <form className="cb-form" onSubmit={handleSubmit}>
                        <div>
                            <input placeholder="Username"
                                   value={username}
                                   onChange={e => setUsername(e.currentTarget.value)}/>
                        </div>
                        <div>
                            <input placeholder="Password"
                                   type="password"
                                   value={password}
                                   onChange={e => setPassword(e.currentTarget.value)}/>
                        </div>
                        {
                            error && <div className="cb-form-error">
                                <span>{error}</span>
                            </div>
                        }
                        <div>
                            <button type="submit" disabled={isFetching} className="cb-button cb-button--outline">LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login-right">
                <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <h2 className="login-right-title cb-title">Don't have an account?</h2>
                    <p className="login-right-text">
                        Do it, I dare you.
                    </p>

                    <Link to="/register" className="login-signup cb-button cb-button--outline cb-link">SIGN UP
                        TODAY
                    </Link>
                </div>

                <Footer/>
            </div>
        </div>
    )
}