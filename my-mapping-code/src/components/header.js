import React, {Component} from 'react';
import "../styling/layout.css";
import "../styling/container_layout.css";
import {Link} from "react-router-dom";
import {CUSTOM, HOME } from '../components/router/routeConstants';

//top header with logo and links for pages
//Link used for routing to other pages
 
class Header extends Component{

    render(){

        return (
            <div >
                <div className = "navbar navbar-default">
                
                <div className = "navbar-header">

                <img src={require("../images/logo.png")} className = "logoimg"></img>
                {/* <Link className = "nav-item" to={HOME}>Home</Link> */}
                <Link className = "navbar-brand" to={HOME}>Home</Link> 
                </div>

                
                <button className="btn btn-success ml-auto">Save</button> 

                </div>


                
                {/* <button class="btn btn-default navbar-btn pull-right" type="submit">Search</button> */}

                {/* <Link className='nav-item' to={HOME}>Home</Link> */}
                {/* <button class="btn btn-success ml-auto">Always Show</button> */}
                
            
                {/* <div className="logobar">
                    <img src={require("../images/logo.png")} className="logoimg"></img>
                </div>
                <div className = "topbar">
                    <Link to={HOME} className="topbarhomelink">Home</Link>
                </div> */}
            </div>
            
        )
            
    }

}
export default Header;