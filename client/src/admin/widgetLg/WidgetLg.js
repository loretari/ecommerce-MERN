import React, {useEffect, useState} from "react";
import "./widgetLg.css";
import { format } from "timeago.js/esm/format";
import axios from "axios";



const WidgetLg = () => {

    const [orders, setOrders] = useState([]);


    const Button = ({type}) => {
        return <button className= {"widgetLgButton" + type}>{ type }</button>
    }

    useEffect(() => {
       const getOrders = async () => {
           try {
               const response = await axios.get(`https://ecommerce-mern-icj2.onrender.com/orders`)

               setOrders(response.data);
           } catch (error) {
               console.error(error.message);
           }
       }
       getOrders();
    }, []);


    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <div className="widgetLgTable">
                {orders
                            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                            .map((order) => (
                                <div className="widgetLgTr" key={order._id}>
                <div className="widgetLgUser">
                    <span>
                        <b className="widgetLgTh">Customer Id: </b>{order.userId}
                    </span>
                </div>
                <div className="widgetLgDate">
                    <span>
                        <b className="widgetLgTh">Date: </b>{format(order.createdAt)}
                    </span>
                </div>
                <div className="widgetLgDate">
                    <span>
                        <b className="widgetLgTh">Products Id: </b>{order.products.productId}
                        {order.products.map(product => product.productId).join(", ")}
                        </span>
                </div>
                <div className="widgetLgDate">
                    <span>
                        <b className="widgetLgTh">Quantity: </b>{order.products.quantity}
                        {order.products.reduce((total, product) => total + product.quantity, 0)}
                    </span>
                </div>
                <div className="widgetLgDate">
                    <span>
                        <b className="widgetLgTh">Amount: </b>$ {order.amount}
                        </span>
                </div>
                <div className="widgetLgDate">
                    <span>
                        <b className="widgetLgTh">Address: </b>{order.address}
                        </span>
                </div>
                <div className="widgetLgDate">
                    <span>
                        <b className="widgetLgTh">Status: </b>
                        <div className="widgetLgStatus">
                    <Button type={order.status}/>
                </div>
                </span>
                </div>
                                </div>
                    )) }
            </div>
        </div>
)
}

export default WidgetLg;