import React, {Component} from 'react';
import "../styling/layout.css";
import { withRouter } from "react-router";
import {BASE_URL} from "../components/router/routeConstants";
class HeaderLogout extends Component{

    goToDashboard = () =>{

        this.props.history.push(BASE_URL);
    }    

    render(){

        return (
            <div className = "topbar">
                <img src={require("../images/logo.png")} className="logoimg"></img>
                <button className = "btn-login" onClick ={this.goToDashboard}> Logout</button>
            </div>
        )
        
    }
}
export default withRouter(HeaderLogout);