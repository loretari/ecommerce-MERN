import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Newsletter from "../components/Newsletter/Newsletter";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";

const Homepage = () => {
    return (
         <div>
             <Navbar/>
             <Slider/>
             <Categories/>
             <Newsletter/>
             <Footer/>
         </div>
    )
}

export default Homepage;