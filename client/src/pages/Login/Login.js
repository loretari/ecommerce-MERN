import React, { useState } from "react";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginSuccess} from "../../redux/userSlice";
import OAuth from "../../components/OAuth/OAuth";

const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`https://mern-ecommerce-app-clqa.onrender.com/auth/login`, {

                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({username, email, password})
            })
            if (res.ok) {
                const data = await res.json();
                console.log("user", data)
                dispatch(loginSuccess (data));
                navigate("/")
            } else {
                const errorData = await res.json();
                if (errorData && errorData.error === "Wrong password") {
                    setError(true);
                } else {
                    setError(false)
                }
            }

        } catch (error) {
            setError(true);
            console.log("Login failed:", error);
            setTimeout(() => {
                setError(false)
            }, 3000)
        }

    }



    return (
        <div id= "login" className= "login-container">
            <div className= "login-wrapper">
                <h1 className= "login-tittle">LOG IN</h1>
                <form onSubmit= {handleLogin} className= "login-form">
                    <input  type= "username" className= "login-input" placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                    />
                    <input  type= "email" className= "login-input" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                    />

                    <input type= "password" className= "login-input" placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className= "login-button" >LOGIN</button>
                    <OAuth/>
                    {error &&  (
                        <div className= "login-error">
                            Wrong username or password! Please try again.
                        </div>
                    )}
                    <p>Don't have an account?
                        <Link className= "login-link"
                              to= "/register"
                        >  CREATE A NEW ACCOUNT</Link>
                    </p>
                </form>


            </div>
        </div>
    )
}

export default Login;