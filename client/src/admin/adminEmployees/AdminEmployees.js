import React, {useEffect} from "react";
import "./adminEmployees.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteEmployeeFailure,
    deleteEmployeeSuccess,
    getEmployeeFailure,
    getEmployeeSuccess
} from "../../redux/employeeSlice";
import axios from "axios";

const AdminEmployees = () => {

    const employees = useSelector((state) => state.employee.employees)

    console.log(employees);

    const dispatch = useDispatch();


    useEffect(() => {
        const getEmployees = async () => {

            try {
                const res = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/admin/employee`)

                if (res.status === 200) {
                    const data = res.data;
                    dispatch (getEmployeeSuccess(data));
                } else {
                    console.error("Failed to fetch employees")
                }

            } catch (error) {
                console.error("Axios error:", error.message)
                dispatch(getEmployeeFailure(error))
            }
        }
        getEmployees();

        }, [dispatch]);

    const handleDelete = async (id) => {

        try {
           const res = await axios.delete(`https://mern-ecommerce-app-clqa.onrender.com/admin/employee/${id}`)
            if (res.status === 200) {
                console.log("Product successfully deleted")
                dispatch(deleteEmployeeSuccess(id));
            } else {
                console.error("Failed to delete employee:", res.statusText)
                dispatch(deleteEmployeeFailure("Failed to delete product"))
            }

        } catch (error) {
            console.error("Failed to delete employee:", error.message);
            dispatch(deleteEmployeeFailure(error));
        }

    }
    

    const columns = [
        // { field: '_id', headerName: 'ID', width: 200 },
        {
            field: "firstName",
            headerName: "Name",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.firstName}
                    </div>
                );
            },
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            editable: true,
        },
        {
            field: 'mail',
            headerName: 'Mail',
            width: 130,
            editable: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            width: 130,
            editable: true,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 130,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/employee/" + params.row._id}>
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

        <div className= "createNewEmployee">


            <Link to= "/newEmployee">
                <button className= "newProductButton">Create Employee</button>
            </Link>
            <DataGrid
                rows = {employees}
                columns = {columns}
                getRowId = {(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
        </div>
           </div>
    )

}

export default AdminEmployees;