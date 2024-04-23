import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import "./oauth.css";
import React, { useState } from "react";
import {app} from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";
import {useNavigate} from "react-router";


const OAuth =() => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const handleGoogleClick = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch(`https://mern-ecommerce-app-clqa.onrender.com/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            })
            const data = await res.json()
            console.log(data);
            dispatch(loginSuccess(data));
            navigate("/");


        } catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    return (
        <div>
            <button className= "oauth-button" type= "button"
                    onClick= {handleGoogleClick}
            >Continue with google</button>
            {error && <div className= "register-error">Could not sign in with google!'</div>}
        </div>

    )
}

export default OAuth;