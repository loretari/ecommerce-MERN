import React, {useEffect} from "react";
import "./adminUsers.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {deleteClientFailure, deleteClientSuccess, getClientFailure, getClientSuccess} from "../../redux/clientSlice";

const AdminUsers =() => {

const users = useSelector((state) => state.client.clients);

const dispatch = useDispatch();

useEffect(() => {
    const getUsers = async () => {
        try {
            const res = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/users/`)
            if (res.status === 200) {
                const data = res.data;
                dispatch(getClientSuccess(data))
            } else {
                console.error("Failed to fetch clients")
            }

        } catch (error) {
            console.error('Axios error:', error)
            dispatch(getClientFailure(error));
        }
    }
    getUsers();
}, [dispatch])

    const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`https://mern-ecommerce-app-clqa.onrender.com/users/${id}`)
        if (res.status === 200) {
            console.log("Product successfully deleted")
            dispatch (deleteClientSuccess(id));
        } else{
            console.error("Failed to delete user:", res.statusText);
            dispatch(deleteClientFailure("Failed to delete product"))
        }
    } catch (error) {
        console.error("Failed to delete client:", error.message);
        dispatch(deleteClientFailure(error));
    }
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 100 },

        {
            field: "username",
            headerName: "Username",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.avatar} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },

        {
            field: "email",
            headerName: "Mail",
            width: 200,
            editable: true,
        },

        {
            field: "isAdmin",
            headerName: "Admin",
            width: 150,
        },

        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/user/" + params.row._id}>
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
        <div style={{ height: 600, width: 1100, marginTop:30, display:"flex",justifyContent:"center"}}>
            <Link to="/newUser">
                <button className="newProductButton">Create New User </button>
            </Link>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
        </div>
    </div>
    )
}

export default AdminUsers;