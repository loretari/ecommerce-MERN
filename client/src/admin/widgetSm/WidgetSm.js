import React, {useEffect, useState} from "react";
import "./widgetSm.css";
import axios from "axios";


const WidgetSm = () => {

    const [users, setUsers] = useState([]);

    // console.log(users);



    useEffect(() => {
         const getUsers = async () => {
             try {
                 const response = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/users/?new=true`)
                 setUsers(response.data);

             } catch (error) {
                 console.error(error.message)
             }
         }
         getUsers();
    }, [])


    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Existing Members</span>
            <ul className="widgetSmList">

                {/* sort user by first access*/}
                {users
                    .filter(user => user._id)
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((user) => (

                    <li className="widgetSmListItem" key={user._id}>
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername" key={`${user._id}_username`}>Name: {user.username}</span>
                            <span className="widgetSmUserTitle" key={`${user._id}_email`}>Mail: {user.email}</span>
                            <span className="widgetSmUserTitle" key={`${user._id}_createdAt`}>First Access: {user.createdAt}</span>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WidgetSm;