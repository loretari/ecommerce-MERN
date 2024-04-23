import React from "react";
import './footer.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const Footer = () => {

    const { currentUser } = useSelector((state) => state.user);


    return (
        <div className= "footer-container">
            <div className= "footer-grid">
            <div className= "footer-left">
                <h1>LorDesIgn shop</h1>
                <div className= "footer-description">
                    <p>Follow us on:</p>
                </div>
                <div className= "social-container">
                    <div className= "social-icons-facebook">
                        <svg className="social-icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
                             aria-hidden="true" viewBox="0 0 24 24" data-testid="FacebookIcon">
                            <path
                                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path>
                        </svg>
                    </div>
                    <div className= "social-icons-instagram">
                        <svg className="social-icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                             focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InstagramIcon">
                            <path
                                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                        </svg>
                    </div>
                    <div className= "social-icons-twitter">
                        <svg className="social-icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                             focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TwitterIcon">
                            <path
                                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className= "footer-center">
                <div className= "footer-link">
                    <h3>Useful Links</h3>
                </div>
                <ul className= "footer-list">
                    <Link className= "footer-item"
                          to= "/admin"
                    >
                        <li className= "footer-listItem">Admin Portal</li>
                    </Link>
                    {currentUser ? (
                    <Link className= "footer-item"
                          to= "/cart"
                    >
                        <li className= "footer-listItem">Cart</li>


                    </Link>
                        ) : (
                            <Link className= "footer-item"
                                  to= "/register"
                            >
                                <li className= "footer-listItem">Cart</li>


                            </Link>
                        )}

                    <Link className= "footer-item"
                          to= "/"
                    >
                        <li className= "footer-listItem">My Account</li>
                    </Link>
                    <Link className= "footer-item"
                          to= "/"
                    >
                        <li className= "footer-listItem">Order Tracking</li>
                    </Link>
                    <Link className= "footer-item"
                          to= "/"
                    >
                        <li className= "footer-listItem">Wish List</li>
                    </Link>
                    <Link className= "footer-item"
                          to= "/"
                    >
                        <li className= "footer-listItem">Terms</li>
                    </Link>
                    <Link className= "footer-item"
                          to= "/"
                    >
                        <div className= "footer-listItem">Hospo Deals</div>
                    </Link>
                    <Link className= "footer-item"
                          to= "/"
                    >
                        <div className= "footer-listItem">Functions</div>
                    </Link>
                </ul>
            </div>



            <div className= "footer-right">
                <h3>Contact</h3>
                <div className= "footer-link">

                </div>
                <div className= "footer-contact">
                    <svg className="icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
                         aria-hidden="true" viewBox="0 0 24 24" data-testid="RoomIcon" >
                        <path
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                    </svg>
                    123 Fake Address, Melbourne, AU
                </div>
                <div className= "footer-contact">
                    <svg className="icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
                         aria-hidden="true" viewBox="0 0 24 24" data-testid="PhoneIcon" >
                        <path
                            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                    </svg>
                    +1 234 56 78
                </div>
                <div className= "footer-contact">
                    <svg className="icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
                         aria-hidden="true" viewBox="0 0 24 24" data-testid="MailOutlineIcon" >
                        <path
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
                    </svg>
                    <a className= "footer-cart" href = "mailto:info@lordesign.com">
                        info@lordesign.com
                    </a>
                </div>
                <img  className= "footer-img" src= "https://i.ibb.co/Qfvn4z6/payment.png"  alt= "payment"/>
            </div>
        </div>
        </div>
    )
}

export default Footer;