import React, {useState} from "react";
import "./adminItem.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateItemFailure, updateItemSuccess} from "../../redux/itemSlice";
import axios from "axios";


const AdminItem = () => {

    const location = useLocation();
    const itemId = location.pathname.split("/")[3];
    const updatedItem = useSelector((state) => state.item.items.find(item => item._id === itemId));

    const [ title, setTitle ] = useState(updatedItem.title);
    const [ cost, setCost ] = useState(updatedItem.cost);
    const [ quantity, setQuantity ] = useState(updatedItem.quantity);
    const [ image, setImage ] = useState(updatedItem.image);
    const [ categories, setCategories ] = useState(updatedItem.categories.join(', '));
    const [ inStock, setInStock ] = useState(updatedItem.inStock);
    const [previewImage, setPreviewImage] = useState(null);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    if (window.console && window.console.error) {
        console.error("Error")
    } else {
        console.log("No Error")
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const itemData = {
                title,
                cost,
                quantity,
                categories: categories.split(', ').map(category => category.trim()),
                inStock,
            };

            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                console.log("FormData: ", formData)

                const uploadResponse = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/upload/image", formData);

                console.log("Upload response:" , uploadResponse.data);

                if (!uploadResponse.data || !uploadResponse.data.image_url) {
                    throw Error ("Image URL is not provided in the response");
                }

                itemData.image = uploadResponse.data.image_url;

                console.log("Item data before sending:", itemData);
            }

            const response = await axios.put(`https://mern-ecommerce-app-clqa.onrender.com/item/${itemId}`, itemData);
            const updatedItem = response.data;

            console.log("Updated item:", updatedItem);

            dispatch(updateItemSuccess({itemId: updatedItem._id, updatedItemData: updatedItem}))
            navigate(`/admin/items`);

        } catch (error) {
            console.log(error.message);
            dispatch(updateItemFailure(error));
        }
    }




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
                            src= {image}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{title}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Category</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{categories}</span>
                        </div>
                        <span className="userShowTitle">$ Cost</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">$ {cost}</span>
                        </div>
                        <span className="userShowTitle">Quantity</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{quantity}</span>
                        </div>

                        <span className="userShowTitle">In Stock</span>

                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{inStock}</span>
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
                                <label>Category</label>
                                <input
                                    name= "categories"
                                    type="text"
                                    placeholder=""
                                    value={categories}
                                    onChange= {(e) => setCategories(e.target.value)}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>$ Cost</label>
                                <input
                                    name= "cost"
                                    type="number"
                                    placeholder=""
                                    value={cost}
                                    onChange= {(e) => setCost(e.target.value)}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Quantity</label>
                                <input
                                    name= "quantity"
                                    type="number"
                                    placeholder=""
                                    value={quantity}
                                    onChange= {(e) => setQuantity(e.target.value)}
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


                            <div className= "addProductItem">
                                <label>Image</label>
                                <input type= "file"
                                       id= "image"
                                       placeholder= "Image..."
                                       onChange={handleImageChange}

                                />
                                <img id= "image" src={previewImage} alt= "Preview" />
                            </div>

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

export default AdminItem;