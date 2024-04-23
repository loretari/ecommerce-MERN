import React, {useState} from "react";
import "./adminNavbar.css";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";
import {useNavigate} from "react-router";
import menu from "../../Assets/menu.png";
import { Link } from "react-router-dom";


const AdminNavbar = ({ handlePageChange }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);


    function MouseOver(event) {
        event.target.style.background = 'Transparent';
    }

    function MouseOut(event) {
        event.target.style.background = 'Transparent';
    }

    const handleLogout =(e) => {
      e.preventDefault();
      dispatch(logout());
      navigate('/');
    }

    return (

            <nav className= "navbar">
                    <div className="navbarMenu">
                        <div  className= "adminLi">
                            <Link
                                to= "/admin/home"
                                style = {{color: "white"}}
                                onMouseOver= {MouseOver}
                                onMouseOut= {MouseOut}
                                onClick= {() => handlePageChange('Home')}
                            >Home
                            </Link>
                        </div>
                        <div  className= "adminLi">
                            <Link
                                to= "/admin/products"
                                style = {{color: "white"}}
                                onMouseOver= {MouseOver}
                                onMouseOut= {MouseOut}
                                onClick= {() => handlePageChange('AdminProducts')}
                            >Products
                            </Link>
                        </div>
                        <div className= "adminLi">
                            <Link
                                to= "/admin/users"
                                style = {{color: "white"}}
                                onMouseOver= {MouseOver}
                                onMouseOut= {MouseOut}
                                onClick= {() => handlePageChange('AdminUsers')}
                            >Users
                            </Link>
                        </div>
                        <div className= "adminLi">
                            <Link
                                to= "/admin/home"
                                style = {{color: "white"}}
                                onMouseOver= {MouseOver}
                                onMouseOut= {MouseOut}
                                onClick= {() => handlePageChange('Home')}
                            >Recipes
                            </Link>
                        </div>
                        <div className= "adminLi">
                            <Link
                                to= "/admin/employees"
                                style = {{color: "white"}}
                                onMouseOver= {MouseOver}
                                onMouseOut= {MouseOut}
                                onClick= {() => handlePageChange('AdminEmployees')}
                            >Employees
                            </Link>
                        </div>
                        <div className= "adminLi">
                            <Link
                                to= "/admin/items"
                                style = {{color: "white"}}
                                onMouseOver= {MouseOver}
                                onMouseOut= {MouseOut}
                                onClick= {() => handlePageChange('AdminItems')}
                            >Items
                            </Link
                               >
                        </div>
                    </div>

                    <button onClick={handleLogout} className= "button-logout">
                        Log Out
                    </button>
                <img src= {menu} alt= "Menu" className= "mobMenu"  onClick = {() => setIsActive(!isActive)}/>

                <div className= "navMenu" style={{display: isActive? 'flex' : 'none'}}>
                    <div  className= "listItem">
                        <Link
                            to= "/admin/home"
                            style = {{color: "white"}}
                            onMouseOver= {MouseOver}
                            onMouseOut= {MouseOut}
                            onClick= {() => setIsActive(false)}
                        >Home
                        </Link>
                    </div>
                    <div  className= "listItem">
                        <Link
                            to= "/admin/products"
                            style = {{color: "white"}}
                            onMouseOver= {MouseOver}
                            onMouseOut= {MouseOut}
                            onClick= {() => setIsActive(false)}
                        >Products
                        </Link>
                    </div>
                    <div className= "listItem">
                        <Link
                            to= "/admin/users"
                            style = {{color: "white"}}
                            onMouseOver= {MouseOver}
                            onMouseOut= {MouseOut}
                            onClick= {() => setIsActive(false)}
                        >Users
                        </Link>
                    </div>
                    <div className= "listItem">
                        <Link
                            to= "/admin/home"
                            style = {{color: "white"}}
                            onMouseOver= {MouseOver}
                            onMouseOut= {MouseOut}
                            onClick= {() => setIsActive(false)}
                        >Recipes
                        </Link>
                    </div>
                    <div className= "listItem">
                        <Link
                            to= "/admin/employees"
                            style = {{color: "white"}}
                            onMouseOver= {MouseOver}
                            onMouseOut= {MouseOut}
                            onClick= {() => setIsActive(false)}
                        >Employees
                        </Link>
                    </div>
                    <div className= "listItem">
                        <Link
                            to= "/admin/items"
                            style = {{color: "white"}}
                            onMouseOver= {MouseOver}
                            onMouseOut= {MouseOut}
                            onClick= {() => setIsActive(false)}
                        >Items
                        </Link>
                    </div>
                </div>



            </nav>


    )
}

export default AdminNavbar;