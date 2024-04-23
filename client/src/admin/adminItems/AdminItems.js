import React, {useEffect} from "react";
import "./adminItems.css";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {DataGrid} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {deleteItemFailure, deleteItemSuccess, getItemFailure, getItemSuccess} from "../../redux/itemSlice";

const AdminItems = () =>  {

    const items = useSelector((state) => state.item.items)

    const dispatch = useDispatch();
    console.log(items)




    useEffect(() => {
        const getItems = async () => {

            try {
                const res = await axios.get(`https://ecommerce-mern-icj2.onrender.com/item`)

                if (res.status === 200) {
                    const data = res.data;
                    dispatch(getItemSuccess(data));
                } else {
                    console.error("Failed to fetch items")
                    dispatch(getItemFailure())
                }
            } catch (error) {
                console.log("Axios error:", error.message);
                dispatch(getItemFailure(error))
            }
        }
        getItems();
    }, [dispatch])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://ecommerce-mern-icj2.onrender.com/item/${id}`)
            if (res.status === 200) {
                console.log("Items successfully deleted")
                dispatch(deleteItemSuccess(id));
            } else {
                console.error("Failed to fetch employee")
            }

        } catch (error) {
            console.log()
            dispatch(deleteItemFailure(error))
        }
    }

    const columns = [
        { field: "_id", headerName: "ID", headerAlign: 'center', width: 180 },
        {
            field: "title",
            headerName: "Product",
            headerAlign: 'left',
            width: 200,
            renderCell: (params) => {

                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.image} alt="" />
                        {/*<img className="productListImg" src={imageURL} alt="" />*/}
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "categories",
            headerName: "Category",
            headerAlign: 'left',
            width: 160,
        },
        { field: "inStock",  headerAlign: 'left',headerName: "Stock", width: 140 },
        { field: "quantity",  headerAlign: 'left',headerName: "Quantity", width: 140 },
        {
            field: "cost",
            headerName: "Cost($)",
            headerAlign: 'left',
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign: 'left',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/item/" + params.row._id}>
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
    ];


    return (
        <div className= "user">
            <Link to="/admin/home" className="userAddButton">
                Back
            </Link>

            <div className= "adminItem">
            <Link to="/newItem">
                <button className="newProductButton">Add Item </button>
            </Link>
            <DataGrid
                rows={items}
                columns={columns}
                getRowId={(row)=>row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
            </div>
        </div>
    )
}

export default AdminItems;