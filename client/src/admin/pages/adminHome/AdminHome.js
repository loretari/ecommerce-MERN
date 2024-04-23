import React from "react";
import "./adminHome.css";
import AdminContainer from "../../adminContainer/AdminContainer";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../../redux/userSlice";

const AdminHome = () => {

     const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }



    return (
        <div>
            {isAdmin ? (
                <div className = "home">
                    <div className= "homeWidgets">
                        <AdminContainer/>
                    </div>
                </div>
            ) : (
                <>
                    <h1>You are not an admin!! You are not authorized to access this area.</h1>
                    <Link to="/" onClick={handleLogout}>Back to Home</Link>
                </>
            )}
        </div>

    )
}

export default AdminHome;