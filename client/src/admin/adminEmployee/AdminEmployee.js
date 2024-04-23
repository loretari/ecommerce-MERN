import React, {useState} from "react";
import "./adminEmployee.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { format } from "timeago.js"
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updateEmployeeSuccess} from "../../redux/employeeSlice";

const AdminEmployee = () => {

    const location = useLocation();
    const employeeId = location.pathname.split("/")[3];

    const updatedEmployee = useSelector((state) => state.employee.employees.find(employee => employee._id === employeeId));

    const [ firstName, setFirstName] = useState(updatedEmployee.firstName);
    const [ lastName, setLastName ] = useState(updatedEmployee.lastName);
    const [ mail, setMail ] = useState(updatedEmployee.mail);
    const [ phone, setPhone ] = useState(updatedEmployee.phone);
    const [ role, setRole ] = useState(updatedEmployee.role);
    const [ salary, setSalary ] = useState(updatedEmployee.salary);

    const dispatch = useDispatch();
    const navigate = useNavigate()




const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const employeeData = {
                firstName,
                lastName,
                mail,
                phone,
                role,
                salary,
            };
            const response = await axios.put(`https://mern-ecommerce-app-clqa.onrender.com/admin/employee/${employeeId}`, employeeData);

            const updatedEmployee = response.data;
            console.log(updatedEmployee);

            dispatch(updateEmployeeSuccess({employeeId: updatedEmployee._id, updatedEmployeeData: updatedEmployee}));

            navigate(`/admin/employees`);

        } catch (error) {
            console.error(error.message);
        }


}


    return (
        <div className="user">
            <div className="userTitleContainer">
                <Link to="/" className="userAddButton">
                    Back
                </Link>
                <h1 className="userTitle">Edit Employee</h1>
                <Link to="/newEmployee">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{firstName} &nbsp;
                                <span className="userShowUsername">{lastName}</span></span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Created at:</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{format(updatedEmployee.createdAt)}</span>
                        </div>
                        <span className="userShowTitle">Contact Details:</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{mail}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{role}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{salary}</span>
                        </div>

                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm"
                    onSubmit={ handleSubmit }
                    >
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Name</label>
                                <input className="userUpdateInput"
                                    name= "firstName"
                                    type="text"
                                    placeholder=""
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}

                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Last name</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Smith"
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    name="mail"
                                    type="email"
                                    placeholder="john@gmail.com"
                                    onChange={(e) => setMail(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                            <input
                                name="phone"
                                type="number"
                                placeholder="phone"
                                onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Role</label>
                                <input
                                    name="role"
                                    type="text"
                                    placeholder="Sales Assistant"
                                    onChange={(e) => setRole(e.target.value)}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Salary</label>
                                <input name="salary"type="number" placeholder="salary"
                                       onChange={(e) => setSalary(e.target.value)}/>
                            </div>
                            <button className="userUpdateButton" style={{ marginTop: 20, width: 100 }}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminEmployee;