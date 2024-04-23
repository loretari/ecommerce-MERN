import React, { useState} from "react";
import "./adminUser.css";
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updateClientSuccess} from "../../redux/clientSlice";
import { format } from 'timeago.js';

const AdminUser =() => {

const location = useLocation();
const userId = location.pathname.split('/')[3];
const updatedUser = useSelector(state => state.client.clients.find(user => user._id === userId));



const [username, setUsername] = useState(updatedUser.username);
const [email, setEmail] = useState(updatedUser.email);
const [avatar, setAvatar] = useState("");
const [isAdmin, setIsAdmin] = useState(updatedUser.isAdmin);

const dispatch = useDispatch();
const navigate = useNavigate();


const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const userData = {
            username,
            email,
            isAdmin,
        };

        if (avatar) {
            const formData = new FormData();
            formData.append("avatar", avatar);

            const uploadResponse = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/upload/avatar", formData);

            if (!uploadResponse.data || !uploadResponse.data.avatar_url) {
                throw new Error("Avatar URL is not provided in the response");
            }

            userData.avatar = uploadResponse.data.avatar_url;
        }


        const response = await axios.put(`https://mern-ecommerce-app-clqa.onrender.com/users/${userId}`, userData );
        const updatedUser = response.data
        console.log(updatedUser)

        dispatch(updateClientSuccess({userId, updatedUserData: updatedUser}));

        navigate(`/admin/users`);

    } catch (error) {
        console.log(error.message);
    }
}



    return (
        <div className= "user">
            <div className= "userTitleContainer">
                <Link to="/" className="userAddButton">
                    Back
                </Link>
                <h1 className= "userTitle">Edit User</h1>
                <Link to= "/newUser">
                    <button className= "userAddButton">Create</button>
                </Link>
            </div>
            <div className= "userContainer">
                <div className= "userShow">

                    <div className="userShowTop">
                        <img
                            src= {updatedUser.avatar}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{updatedUser.username}</span>

                        </div>
                    </div>

                    <div className= "userShowBottom">
                        <span className= "userShowTitle">Created at: </span>
                        <div className= "userShowInfo">
                            <span className="userShowInfoTitle">{format(updatedUser.createdAt)}</span>
                        </div>
                        <span className= "userShowTitle">Contact Details:</span>
                        <div className="userShowInfo">
                            <span className= "userShowTitle">Email:</span>
                            <span className= "userShowInfoTitle">{updatedUser.email}</span>
                        </div>

                        <div className="userShowInfo">
                            <span className= "userShowTitle">Is Admin:</span>
                            <span className= "userShowInfoTitle">{updatedUser.isAdmin}</span>
                            <select
                                name="isAdmin"
                                id="isAdmin"
                                value= {isAdmin}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>

                        </div>

                    </div>
                </div>
                <div className= "userUpdate">
                    <span className= "userUpdateTitle">Edit</span>
                    <form className= "userUpdateForm"
                    onSubmit={handleSubmit}
                    >
                        <div className= "userUpdateLeft">
                            <div className= "userUpdateItem">
                                <label>User Name:</label>
                                <input className= "userUpdateInput"
                                       name= "username"
                                       type= "text"
                                       placeholder= ""
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className= "userUpdateItem">
                                <label>Email:</label>
                                <input className= "userUpdateInput"
                                       name= "email"
                                       type= "text"
                                       placeholder= ""
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Is Admin:</label>
                                <select
                                    name="isAdmin"
                                    id="idStock"
                                    value= {isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.value)}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="userUpdateRight">
                                <div className= "userUpdateItem">
                                    <label>Avatar:</label>
                                <div className="userUpdateUpload">
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={ e => setAvatar(e.target.files[0])}/>

                                    <label htmlFor="file">

                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                            </div>
                            <button className= "userUpdateButton" style= {{marginTop: 20, width: 100}}
                            >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminUser;