import React from "react";
import "./category.css";
import { Link } from "react-router-dom";

const Category = ({ item }) => {
    return (
      <div className= "category-container">
          <Link className= "category-info"
          onClick = {() => window.scrollTo(0, 0)}
                to={`/products/${item.cat}`} style = {{textDecoration: 'none'}}
          >
              <img className= "category-images" src={item.img} alt= "categoryImg"/>
              <h1 className= "category-tittle">{item.title}</h1>
          <button className= "category-button">SHOP NOW</button>
          </Link>
      </div>
    )
}

export default Category;