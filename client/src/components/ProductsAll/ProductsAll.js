import React, {useEffect, useState} from "react";
import Product from "../Product/Product";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {Link} from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import NewsLetter from "../Newsletter/Newsletter";
import Footer from "../Footer/Footer";

const ProductsAll = () => {

    const [products, setProducts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("newest");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const res = await axios.get("https://ecommerce-mern-icj2.onrender.com/products");
               setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products", error)
            }
        };
        fetchProducts();
    }, []);


    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    }

    const sortProducts = (criteria) => {
        switch (criteria) {
            case "asc":
                return [...products].sort((a, b) => a.price - b.price);
            case "desc":
                return [...products].sort((a, b) => b.price - a.price);
            case "newest":
                return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            default:
                return products;
        }
    };

    const sortedProducts = sortProducts(sortCriteria);

    return (
        <div>
            <Navbar />

            <div style={{ background: "#c5f0fc" }}>
                <Link to="/">
                    <KeyboardBackspaceOutlinedIcon />
                </Link>
            </div>
            <div className= "shop-filterContainer">

                <div className= "shop-filter">
                    <div className= "shop-filterText">
                        <span> Sort Products:</span>
                    </div>
                    <select className= "shop-select"
                            value={sortCriteria}
                            onChange={handleSortChange} >
                        <option value= "newest">Newest</option>
                        <option value = "acs">Price (lowest - highest)</option>
                        <option value= "desc">Price (highest - lowest)</option>
                    </select>
                </div>
            </div>

            <div className= "products-container">

                {sortedProducts.map((item) => (

                    <Product item={item} key = {item.id}/>))}
            </div>

            <NewsLetter />
            <Footer />
        </div>

    )
}

export default ProductsAll;