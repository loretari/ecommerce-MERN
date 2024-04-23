import React, { useState } from "react";
import "./register.css";
import OAuth from "../../components/OAuth/OAuth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import { Link } from "react-router-dom";
import { register } from "../../redux/userSlice";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`https://mern-ecommerce-app-clqa.onrender.com/auth/register`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({username, email, password})
            })

            const data = await res.json()
            dispatch(register(data))
            navigate("/")

        } catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }






    return (
        <div id= "register" className= "register-container" >
            <div className= "register-wrapper" >
                <h1 className= "register-tittle"> REGISTER</h1>
                <form onSubmit={handleRegister} className= "register-form">
                    <input   type= "username" className= "register-input" placeholder="Username"
                             onChange={(e) => setUsername(e.target.value)}
                    />
                    <input  type= "email" className= "register-input" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                    />
                    <input  type= "password" className= "register-input" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className= "register-button">
                        REGISTER
                    </button>
                    <OAuth/>
                    {error && <div className= "register-error">Wrong username or password! Try different ones.</div>}
                    <p>Already have an account?
                        <Link className= "register-link"
                              to= "/login"
                        > Login here</Link>
                    </p>
                </form>


            </div>
        </div>
    )
}

export default Register;