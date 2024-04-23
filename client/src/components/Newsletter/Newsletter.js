import React from "react";
import "./newsletter.css";

const Newsletter = () => {
    return (
        <div className= "newsletter-container">
            <h1 className= "newsletter-title">Newsletter</h1>
            <div className= "newsletter-description">Stay connected and never miss our offers!</div>
            <div className= "newsletter-inputContainer">
                <input className= "newsletter-input" placeholder="Your email" />
                <button className= "newsletter-button">
                    <svg className="newsletter-MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                         focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SendIcon">
                        <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Newsletter;