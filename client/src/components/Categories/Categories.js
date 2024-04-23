import React from "react";
import { categories } from "../../dummydata";
import Category from "./Category";


const Categories = () => {
    return(
        <div className= "categories-container">
            <div className= "categories-grid">
            {categories.map(item => (
                <Category className = "" item = {item} key = {item.id}/>
            ))}
            </div>
            </div>
    )
}

export default Categories;