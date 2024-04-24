import React, {useEffect} from "react";
import './App.css';
import Homepage from "./pages/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import "react-toastify/dist/ReactToastify.css";
import Success from "./pages/Success";
import AdminLogin from "./admin/pages/adminLogin/AdminLogin";
import AdminHome from "./admin/pages/adminHome/AdminHome";
import AdminProduct from "./admin/adminProduct/AdminProduct";
import NewProduct from "./admin/newProduct/NewProduct";
import AdminUser from "./admin/adminUser/AdminUser";
import NewUser from "./admin/newUser/NewUser";
import AdminUsers from "./admin/adminUsers/AdminUsers";
import AdminProducts from "./admin/adminProducts/AdminProducts";
import AdminEmployee from "./admin/adminEmployee/AdminEmployee";
import AdminEmployees from "./admin/adminEmployees/AdminEmployees";
import NewEmployee from "./admin/newEmployee/NewEmployee";
import AdminItems from "./admin/adminItems/AdminItems";
import AdminItem from "./admin/adminItem/AdminItem";
import NewItem from "./admin/newItem/NewItem";
import ProductsAll from "./components/ProductsAll/ProductsAll";






function App() {

    useEffect(() => {
        localStorage.setItem('cookieConsent', 'true');
    }, []);


  return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route index path= "/" element= {<Homepage/>}/>
            <Route path= "/products" element={<ProductsAll/>} />
            <Route path= "/products/:category" element={<ProductList />} />
            <Route path= "/product/:id" element={<Product />} />
            <Route path= "/login" element= {<Login />}/>
            <Route path= "/register" element={<Register/>}/>
            <Route path= "/cart"  element={<Cart/>}/>
            <Route path= "/success" element={<Success/>}/>
            <Route path= "/admin" element={<AdminLogin/>}/>
            <Route path= "/admin/home" element={<AdminHome/>}/>
            <Route path= "/admin/user/:id" element={<AdminUser/>} />
            <Route path= "/admin/users" element={<AdminUsers/>}/>
            <Route path= "/newUser" element={<NewUser/>}/>
            <Route path= "/admin/product/:id" element={<AdminProduct/>}/>
            <Route path= "/admin/products" element={<AdminProducts/>}/>
            <Route path= "/newProduct" element={<NewProduct/>} />
            <Route path= "/admin/employee/:id" element={<AdminEmployee/>}/>
            <Route path= "/admin/employees" element={<AdminEmployees/>}/>
            <Route path= "/newEmployee" element={<NewEmployee/>}/>
            <Route path= "admin/items" element={<AdminItems/>}/>
            <Route path= "admin/item/:id" element={<AdminItem/>}/>
            <Route path= "/newItem" element={<NewItem/>}/>


            {/* no match route */}
            <Route
                path="**"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There is nothing here!</p>
                    </main>
                }
            />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
