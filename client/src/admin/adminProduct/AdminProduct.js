import React, {useState} from "react";
import "./adminProduct.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { updateProductSuccess} from "../../redux/productSlice";
import axios from "axios";



const AdminProduct = () => {

    const location = useLocation();
    const productId = location.pathname.split('/')[3];
    const updatedProduct = useSelector((state) => state.product.products.find(product => product._id === productId));

    const [title, setTitle] = useState(updatedProduct.title);
    const [description, setDescription] = useState(updatedProduct.description);
    const [categories, setCategories] = useState(updatedProduct.categories.join(', '));
    const [price, setPrice] = useState(updatedProduct.price);
    const [image, setImage] = useState("");
    const [inStock, setInStock] = useState(updatedProduct.inStock);



    const dispatch = useDispatch();
    const navigate = useNavigate();





    const handleClick = async (e) => {
        e.preventDefault()

            try {

                const productData = {
                    title,
                    description,
                    categories: categories.split(',').map(category => category.trim()),
                    price,
                    inStock,
                };

                if (image) {
                    const formData = new FormData();
                    formData.append("image", image);

                    const uploadResponse = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/upload/image", formData);

                    if (!uploadResponse.data || !uploadResponse.data.image_url) {
                        throw new Error("Image URL is not provided in the response");
                    }
                  productData.image = uploadResponse.data.image_url;

                }

                const response = await axios.put(
                    `https://mern-ecommerce-app-clqa.onrender.com/products/${productId}`, productData);
               const updatedProduct = response.data


                dispatch(updateProductSuccess({ productId, updatedProductData: updatedProduct }));

                navigate(`/product/${productId}`);
            } catch (error) {
                console.error(error.message);
            }
        };

    return (
        <div className="user">
            <div className="userTitleContainer">

                <Link to="/" className="userAddButton">
                    Back
                </Link>
                <h1 className="userTitle">Edit Product</h1>
                <Link to="/newProduct">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src= {updatedProduct.image}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{updatedProduct.title}</span>

                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Price</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">$ {updatedProduct.price}</span>
                        </div>
                        <span className="userShowTitle">Description</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{updatedProduct.description}</span>
                        </div>

                        <span className="userShowTitle">In Stock</span>

                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{updatedProduct.inStock}</span>
                        </div>


                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Title</label>
                                <input
                                    name= "title"
                                    type="text"
                                    placeholder=""
                                    value={title}
                                    onChange= {(e) => setTitle(e.target.value)}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Description</label>
                                <input
                                    name= "description"
                                    type="text"
                                    placeholder=""
                                    onChange= {(e) => setDescription(e.target.value)}
                                    value={description}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Categories:</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    value={categories}
                                    onChange= {(e) => setCategories(e.target.value)}

                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Price</label>
                                <input
                                    name= "price"
                                    type="number"
                                    placeholder=""
                                    value={price}
                                    onChange= {(e) => setPrice(e.target.value)}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>In Stock</label>
                                <select
                                    name= "inStock"
                                    id= "inStock"
                                    value={inStock}
                                    onChange= {(e) => setInStock(e.target.value)}

                                >
                                    <option value= "true">Yes</option>
                                    <option value= "false">No</option>
                                </select>
                            </div>

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <input type="file" id="file" onChange={ e => setImage(e.target.files[0])}/>
                                <label htmlFor="file">

                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton"
                                onClick={handleClick}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProduct;