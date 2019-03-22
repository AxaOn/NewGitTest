import React, { Component } from 'react';
import "../styling/container_layout.css";
import "../styling/layout.css";
import "../styling/content_layout.css";
import { withRouter } from "react-router";
import Header from './header';
import {Link} from "react-router-dom";
import { MAP, CUSTOM, FEATURE_DETAILS } from '../components/router/routeConstants';
import { app_title } from "./constants/variable_constants";

class Home extends Component {

    constructor(props) {
        
        super(props);
        document.title = app_title;
      }
    
    render() {

        return (

            <div >
                <div className= "container">
                    <Header />
                    <img src={require("../images/road.png")} className="roadimg"></img> 

                    {/* set margin top for just this top div tag otherwise all other "leftcontent" use same settings */}
                    
                    <div className= "leftcontent" style = {{marginTop : "2%"}}>         
                        <p className= "contentHeading">
                            Street ODR
                        </p>
                        <p className= "contentParagraph">
                            There’s a world of places around you waiting to be explored.
                            IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
                            selected from world map and do customizations in terms of adding traffic lights, signs
                            or signals and editing road lanes and road width manually. You can save customized ODR
                            along with all the customizations, which will be editable on reopening customized ODR.
                        </p>
                        <Link to={FEATURE_DETAILS} className= "hyperlinkstyle">Learn More</Link>
                    </div>
                    
                    <div className= "rightcontent">
                        <p className= "contentHeading">
                            Customizable ODR
                        </p>
                        <p className= "contentParagraph">
                            There’s a world of places around you waiting to be explored.
                            IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
                            selected from world map and do customizations in terms of adding traffic lights, signs
                            or signals and editing road lanes and road width manually. You can save customized ODR
                            along with all the customizations, which will be editable on reopening customized ODR.
                        </p>
                        <Link to={FEATURE_DETAILS} className= "hyperlinkstyle">Learn More</Link>
                    </div>
                    
                </div>
            </div>
            
        );

    };
}

export default withRouter(Home);