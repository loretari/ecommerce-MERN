import React, { useState, useEffect} from "react";
import "./navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";



const Navbar = () => {

    const { currentUser } = useSelector((state) => state.user);
    const  cartQuantity  = useSelector((state) => state.cart.quantity);

    const dispatch = useDispatch();



   const [isScrolled, setIsScrolled] = useState(false);


   const navigate = useNavigate();




    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout());
        navigate("/")
    }


    return(
        <div className= {`${"navbar-container"} ${isScrolled ? "scrolled" : ""}`}>
                <div className= "navbar-center">
                    <Link className= "navbar-title"
                          onClick={() => window.scrollTo(0, 0)}
                          to= "/">
                         LorDesIgn
                    </Link>
                </div>
                <div>
                    {currentUser ? (
                        <div className= "navbar-right">
                            <Link className= "navbar-item"

                                  onClick = {() => window.scrollTo(0, 0)}
                                  to= "/cart">


                                <img
                                    className= "currentUser-img"
                                    src={currentUser.avatar}
                                    alt= "profile"/>

                            </Link>
                            <Link to= "/cart">
                                <div className= "navbar-item">
                      <span className="MuiBadge-root css-1c32n2y-MuiBadge-root"><svg
                          className="MuiSvgIcon-root MuiSvgIcon-colorAction
                            MuiSvgIcon-fontSizeMedium css-11pbyhm-MuiSvgIcon-root"
                          focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                          data-testid="ShoppingCartOutlinedIcon"><path
                          d="M15.55 13c.75 0 1.41-.41
                           1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6
                           7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16
                             6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7
                           22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2
                           1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg><span
                          className="MuiBadge-badge MuiBadge-standard
                           MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular
                           MuiBadge-overlapRectangular MuiBadge-colorPrimary
                          css-106c1u2-MuiBadge-badge"
                      >
                          {cartQuantity}
                      </span></span>
                                </div>
                            </Link>
                            <button className= "logoutNavbar"
                                    onClick={handleLogout}
                            >LOGOUT</button>
                        </div>
                    ) : (
                        <div className= "navbar-right">
                            <Link className= "navbar-item"
                                  onClick = {() => window.scrollTo(0, 0)}
                                  to= '/register'>REGISTER</Link>

                            <Link className= "navbar-item"
                                  onClick = {() => window.scrollTo(0, 0)}
                                  to= '/login'>LOGIN</Link>

                        </div>
                    )}


                </div>
        </div>


    )
}

export default Navbar;