import React, { Component } from 'react';
import "../styling/container_layout.css";
import "../styling/layout.css";
import "../styling/content_layout.css";
import { withRouter } from "react-router";
import Header from './header';
import {Link} from "react-router-dom";
import { MAP, CUSTOM, FEATURE_DETAILS } from '../components/router/routeConstants';
import { app_title } from "./constants/variable_constants";

class Login extends Component {

    constructor(props) 
    {
        
        super(props);
        document.title = app_title;
    }
    
    render()
    {

        return (
            <div className="container">
                <Header/>
                <div className = "logincontainer">
                <p className = "heading">Login with email & password</p>
                <p className = "paragraph">Email</p>
                <input className = "inputbox" type = "text" placeholder="Enter email"></input>
                </div>
                
            </div>
        )
        

    }

}
export default withRouter(Login);