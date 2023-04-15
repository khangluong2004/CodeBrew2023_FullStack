import "./register.css";
import {useContext, useState} from "react";
import {AuthContext, authLogin, authRegister} from "../lib/auth.js";
import {Link, Navigate} from "react-router-dom";
import Footer from "../components/footer.jsx";


export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const {auth, setAuth} = useContext(AuthContext);

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== repeatPassword) {
            setError('you\'re an idiot sir');
            return;
        }

        // send login
        setError('');
        setIsFetching(true);

        try {
            await authRegister({username, password, email});

            alert('User registers, please login');
            // redirect to home
            setShouldRedirect(true);
        } catch (err) {
            setError(err);
        } finally {
            setIsFetching(false);
        }
    }


    return (
        <div className="register-page">
            {
                shouldRedirect && <Navigate to="/login"/>
            }
            <div className="register-left">
                <div className="register-shift">
                    <h1 className="cb-form-title cb-title">
                        Sign Up To <span className="cb-fancy register-title">Frugalicious</span>
                    </h1>

                    <form className="cb-form" onSubmit={handleSubmit}>
                        <div>
                            <input placeholder="Create Your Username"
                                   value={username}
                                   onChange={e => setUsername(e.currentTarget.value)}/>
                        </div>
                        <div>
                            <input placeholder="Email"
                                   value={email}
                                   onChange={e => setEmail(e.currentTarget.value)}/>
                        </div>
                        <div>
                            <input placeholder="Password"
                                   type="password"
                                   value={password}
                                   onChange={e => setPassword(e.currentTarget.value)}/>
                        </div>
                        <div>
                            <input placeholder="Confirm Password"
                                   type="password"
                                   value={repeatPassword}
                                   onChange={e => setRepeatPassword(e.currentTarget.value)}/>
                        </div>
                        {
                            error && <div className="cb-form-error">
                                <span>{error}</span>
                            </div>
                        }
                        <div>
                            <button type="submit" disabled={isFetching} className="cb-button cb-button--outline">
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="register-right">
                <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <h2 className="register-right-title cb-title">Already have an account?</h2>
                    <p className="login-right-text">
                        Login here
                    </p>

                    <Link to="/login" className="register-signup cb-button cb-button--outline cb-link">
                        LOGIN
                    </Link>
                </div>

                <Footer/>
            </div>
        </div>
    )
}