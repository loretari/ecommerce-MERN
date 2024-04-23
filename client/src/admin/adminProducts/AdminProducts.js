import React, {useEffect} from "react";
import "./adminProducts.css";
import {DataGrid} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {deleteProductFailure, deleteProductSuccess, getProductSuccess} from "../../redux/productSlice";
import axios from "axios";


const AdminProducts = () => {

     const products = useSelector((state) => state.product.products);

     const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/products/`)
                if (res.status === 200) {
                    const data = res.data;
                    dispatch(getProductSuccess(data));

                } else {
                    console.error("Failed to fetch items:", res.statusText);
                }

            }  catch (error) {
                    console.error('Axios error config:', error);
                }

            }

        getProducts();
    }, [dispatch]);



    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://mern-ecommerce-app-clqa.onrender.com/products/${id}`)
            if (res.status === 200) {
                console.log("Product successfully deleted")
                dispatch (deleteProductSuccess(id));
            } else{
                console.error("Failed to delete product:", res.statusText);
                dispatch(deleteProductFailure("Failed to delete product"))
            }

        } catch (error) {
            console.error("Failed to delete product:", error.message);
            dispatch(deleteProductFailure(error))

        }

    }

    if (!products) {
        return <div>Loading ...</div>
    }
    const columns = [
        {
            field: "_id", headerName: "ID", width: 100
        },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.image} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "categories",
            headerName: "Category",
            width: 200,
        },
        {
            field: "inStock",
            headerName: "Stock",
            width: 200,
        },

        {
            field: "price",
            headerName: "Price",
            width: 200,
        },


        {
            field: "action",
            headerName: "Action",
            headerAlign: 'left',
            width: 150,
            renderCell: (params) => {

                return (
                    <>
                        <Link to= {"/admin/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineOutlinedIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },

    ]



    return (
        <div className= "user">
            <Link to="/admin/home" className="userAddButton">
                Back
            </Link>
        <div className= "creatNewProduct">
            <Link to= "/newProduct">
                <button className= "newProductButton">Create New Product</button>
            </Link>
            <DataGrid
                rows = {products}
                columns = {columns}
                getRowId = {(row)=> row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
        </div>
        </div>
    )
}

export default AdminProducts;