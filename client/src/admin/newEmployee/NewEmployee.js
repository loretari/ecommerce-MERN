import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {addEmployeeSuccess} from "../../redux/employeeSlice";


const NewEmployee = () => {

    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ mail, setMail ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ role, setRole ] = useState("");
    const [ salary, setSalary ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleClick =  async (e) => {
        e.preventDefault();

        try {

                const employeeData = {
                    firstName,
                    lastName,
                    mail,
                    phone,
                    role,
                    salary,
                }

                const response = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/admin/employee", employeeData);

                const employee = response.data;
                dispatch(addEmployeeSuccess (employee));

                navigate(`/admin/employees`);

        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <div className="user">
            <Link to="/admin/home" className="userAddButton">
                Back
            </Link>
            <div className="newUser">
                <h1 className="newUserTitle">New Employee</h1>
                <form className="newUserForm">
                    <div className="newUserItem">
                        <label>Name</label>
                        <input name="firstName"type="text" placeholder="John"
                               onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="newUserItem">
                        <label>Last name</label>
                        <input name="lastName"type="text" placeholder="Smith"
                               onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="newUserItem">
                        <label>Mail</label>
                        <input name="mail"type="email" placeholder="john@gmail.com"
                               onChange={(e) => setMail(e.target.value)}/>
                    </div>
                    <div className="newUserItem">
                        <label>Phone</label>
                        <input name="phone"type="number" placeholder="phone"
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="newUserItem">
                        <label>Role</label>
                        <input name="role"type="text" placeholder="Sales Assistant"
                               onChange={(e) => setRole(e.target.value)}/>
                    </div>
                    <div className="newUserItem">
                        <label>Salary</label>
                        <input name="salary"type="number" placeholder="salary"
                               onChange={(e) => setSalary(e.target.value)}/>
                    </div>

                    <button onClick = {handleClick} className="newUserButton">Create</button>
                </form>
            </div>
        </div>
    )
}

export default NewEmployee;