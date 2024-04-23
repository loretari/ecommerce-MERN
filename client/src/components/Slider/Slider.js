import React, { useState } from "react";
import "./slider.css";
import { sliderItems } from "../../dummydata";
import styled from "styled-components";
import {Link} from "react-router-dom";



const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick =(direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    }

    const Wrapper = styled.div`transform: translateX(${(props) => props.slideIndex * -100}vw)`;


    return (
        <div className= "slider-container" id= "slider">
            <div className= "slider-arrow-left" direction = "left"
                 onClick={() => handleClick("left")}
            >
                <svg className="slider-MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
                     aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowLeftOutlinedIcon">
                    <path d="m14 7-5 5 5 5V7z"/>
                </svg>
            </div>

            <Wrapper className= "slider-wrapper" slideIndex={ slideIndex}>
                {sliderItems.map((item) => (
                    <div className= "slider-slide"
                         key={item.id}
                    >
                        <div className= "slider-imageContainer">
                            <img src={ item.img} className= "slider-image" alt= "slideImg"/>
                        </div>
                        <div className= "slider-infoContainer">
                            <h1 className= "slider-title">{item.title}</h1>
                            <p className= "slider-description">{item.desc}</p>

                            <Link to={`/products/Clothing`}>
                                <button className= "slider-button">SHOP NOW</button>
                            </Link>

                        </div>
                    </div>
                ))}
            </Wrapper>


            <div className= "slider-arrow-right" direction = "right"
                 onClick={() => handleClick("right")}
            >
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
                     aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowRightOutlinedIcon">
                    <path d="m10 17 5-5-5-5v10z"></path>
                </svg>
            </div>
        </div>

    )
}

export default Slider;