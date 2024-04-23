import React, {useState} from "react";
import "./newUser.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {addClientSuccess} from "../../redux/clientSlice";

const NewUser = () => {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [previewImage, setPreviewImage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("avatar", avatar);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("isAdmin", isAdmin);

            const uploadResponse = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/upload/avatar", formData);

            if (!uploadResponse.data || !uploadResponse.data.avatar_url) {
                throw new Error("Image URL is not provided in the response")
            }

            const userData = {
                username,
                email,
                password,
                avatar: uploadResponse.data.avatar_url,
                isAdmin,
            };

            const response = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/users/saveUser", userData);

            const user = response.data;

            dispatch(addClientSuccess(user));

            navigate(`/admin/users`);

        } catch (error) {
            console.error(error.message);
        }
    };



    return (
        <div className="user">

            <Link to="/admin/home" className="userAddButton">
                Back
            </Link>
            <div className="newUser">
                <h1 className="newUserTitle">New User</h1>
                <form className="newUserForm">
                    <div className="newUserItem">
                        <label>Username</label>
                        <input type="text" placeholder="john"
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className= "addAvatarItem">
                        <label>Avatar</label>
                        <input type= "file"
                               id= "avatar"
                               placeholder= "Avatar..."
                               onChange={handleAvatarChange}

                        />
                        <img id= "productImage" src={previewImage} alt= "Preview" />

                    </div>



                    <div className="newUserItem">
                        <label>Email</label>
                        <input name= "mail" type="email" placeholder="john@gmail.com"
                               onChange= {(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="newUserItem">
                        <label>Password</label>
                        <input name= "password" type="password" placeholder="password"
                               onChange= {(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="newUserItem">
                        <label>Gender</label>
                        <div className="newUserGender">
                            <input type="radio" name="gender" id="male" value="male"/>
                            <label htmlFor="male">Male</label>
                            <input type="radio" name="gender" id="female" value="female"/>
                            <label htmlFor="female">Female</label>
                            <input type="radio" name="gender" id="other" value="other"/>
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                    <div className="newUserItem">
                        <label>Admin</label>
                        <select defaultValue= "yes" style={{height: "43px"}}
                                className="newUserSelect" name="isAdmin"
                        onChange={(e) => setIsAdmin(e.target.value)}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <button onClick={handleClick} className="newUserButton">Create</button>
                </form>
            </div>
        </div>

    )
}

export default NewUser;