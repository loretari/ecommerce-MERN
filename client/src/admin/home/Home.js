import React from "react";
import "./home.css";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import WidgetSm from "../widgetSm/WidgetSm";
import WidgetLg from "../widgetLg/WidgetLg";



const Home = () => {

    const {currentUser} = useSelector((state) => state.user)


    return (
        <div>
            {currentUser ? (
                <div>
                    <Link className= "navbar-item"
                          onClick = {() => window.scrollTo(0, 0)}
                          to= "/profile">
                        <img
                            className= "currentUser-img"
                            src={currentUser.avatar}
                            alt= "profile"/>

                    </Link>
                </div>
            ) : (
                <div>
                    Welcome {currentUser.username}  &nbsp;
                </div>
            )}
            <div className= "containerCenter">
                <WidgetLg/>
            </div>
            <div className= "containerRight">
                <WidgetSm/>
            </div>
        </div>
    )
}

export default Home;