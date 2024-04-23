import React, {useState} from "react";
import "./adminContainer.css";
import Home from "../home/Home";
import AdminProducts from "../adminProducts/AdminProducts";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import AdminUsers from "../adminUsers/AdminUsers";
import AdminEmployees from "../adminEmployees/AdminEmployees";
import AdminItems from "../adminItems/AdminItems";
const AdminContainer = () => {

    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home/>
        }
        if (currentPage === 'AdminProducts') {
          return <AdminProducts/>
        }

        if (currentPage === 'AdminEmployees') {
            return <AdminEmployees/>
        }
        if (currentPage === 'AdminItems') {
            return <AdminItems/>
        }
        return <AdminUsers/>
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <AdminNavbar currentPage = { currentPage } handlePageChange = { handlePageChange }/>
                { renderPage() }
        </div>
    )
}

export default AdminContainer;