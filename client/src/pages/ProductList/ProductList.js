import React, {useState} from "react";
import "./productList.css";
import Navbar from "../../components/Navbar/Navbar";
import {Link, useLocation} from "react-router-dom";
import Products from "../../components/Products/Products";
import NewsLetter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const ProductList = () => {

    const location = useLocation();
    const category = location.pathname.split('/')[2];
    const [sort, setSort] = useState("newest");


    return (
        <div >
            <Navbar />

            <div style={{ background: "#c5f0fc" }}>
                <Link to="/">
                    <KeyboardBackspaceOutlinedIcon />
                </Link>
            </div>
            <h1 className= "shop-title">{category}</h1>
            <div className= "shop-filterContainer">

                <div className= "shop-filter">
                    <div className= "shop-filterText">
                        <span> Sort Products:</span>
                    </div>
                    <select className= "shop-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)} >
                        <option value= "newest">Newest</option>
                        <option value = "acs">Price (asc)</option>
                        <option value= "desc">Price (desc)</option>
                    </select>
                </div>
            </div>
            <Products cat = {category} sort = {sort} />
            <NewsLetter />
            <Footer />
        </div>
    )
}

export default ProductList;