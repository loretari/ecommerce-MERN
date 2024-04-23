import React, {useEffect, useState} from "react";
import "./newProduct.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProductSuccess} from "../../redux/productSlice";


const NewProduct = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [inStock, setInStock] = useState(true);
    const navigate = useNavigate();

    const dispatch = useDispatch();




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(e.target.files[0]);


        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file)
    }



    const handleClick = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append("image", image);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("categories", categories);
            formData.append("price", price);
            formData.append("inStock", inStock);

            const uploadResponse = await axios.post(
                "https://mern-ecommerce-app-clqa.onrender.com/upload/image",
                formData
            );

            if (!uploadResponse.data || !uploadResponse.data.image_url) {
                throw new Error("Image URL is not provided in the response");
            }

            const productData = {
                title,
                description,
                categories,
                image: uploadResponse.data.image_url,
                price,
                inStock,
            };

            const response = await axios.post(
                "https://mern-ecommerce-app-clqa.onrender.com/products",
                productData
            );

            const product = response.data;

            dispatch(addProductSuccess(product));

            navigate(`/product/${product._id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://mern-ecommerce-app-clqa.onrender.com/products");
                const products = response.data;
                products.forEach((product) => dispatch(addProductSuccess(product)));
            } catch (error) {
                console.error("Failed to fetch products:", error.message)
            }
        };
        fetchProducts();
    }, [dispatch])

    return (
        <div className="user">

            <Link to="/admin/home" className="userAddButton">
                Back
            </Link>
            <div className= "newProduct">
                <h1>New Product</h1>
                <form className= "addProductForm"
                      onSubmit={handleClick} encType= "multipart/form-data"
                >
                    <div className= "addProductItem">
                        <label>Image</label>
                        <input type= "file"
                               id= "image"
                               placeholder= "Image..."
                               onChange={handleImageChange}

                        />
                        <img id= "userAvatar" src={previewImage} alt= "Preview" />

                    </div>
                    <div className= "addProductItem">
                        <label>Title:</label>
                        <input type= "text" name= "title" placeholder= ""
                               onChange= {(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className= "addProductItem">
                        <label>Description:</label>
                        <input name = "description" type= "text" placeholder= ""
                               onChange= {(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className= "addProductItem">
                        <label>Categories:</label>
                        <input type= "text" name= "categories" placeholder= ""
                               onChange= {(e) => setCategories(e.target.value)}
                        />
                    </div>

                    <div className= "addProductItem">
                        <label>Price:</label>
                        <input name = "price" type= "number" placeholder= ""
                               onChange= {(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className= "addProductItem">
                        <label>Stock:</label>
                        <select name= "inStock"
                                onChange= {(e) => setInStock(e.target.value)}
                        >
                            <option value= "true">Yes</option>
                            <option value= "false">No</option>
                        </select>
                    </div>
                    <button className= "addProductButton"
                    >Create</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct;