import React, { Component } from 'react';
import "../styling/container_layout.css";
import "../styling/layout.css";
import "../styling/content_layout.css";
import { withRouter } from "react-router";
import Header from './header';
import {Link} from "react-router-dom";
import {MAP, FEATURE_DETAILS} from '../components/router/routeConstants';
import { app_title } from "./constants/variable_constants";

// shows list and details of all features/services provided
// navigate from this page to main functionality 

class FeatureDetails extends Component {

    constructor(props) {

        super(props);
        this.state = {
            cur: "feature"
        }
        document.title = app_title;
        
    }
    
    //go to map page to select coordinates
    goToMapPage(){

        this.props.history.push(
            {
                pathname: MAP,
                data: []
            }
        );
      
    }

    render() {
        return (

            <div >
                <div className= "container">
                    <Header />

                    {/* set margin top for just this top div tag otherwise all other "leftcontent" use same settings */}
                    
                    <div className= "leftcontent" style = {{marginTop : "2%"}}>         
                        <p className= "contentHeading">
                            Path Accuracy
                        </p>

                        <p className= "contentParagraph">
                            There’s a world of places around you waiting to be explored.
                            IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
                            selected from world map and do customizations in terms of adding traffic lights, signs
                            or signals and editing road lanes and road width manually. You can save customized ODR
                            along with all the customizations, which will be editable on reopening customized ODR.
                        </p>

                        <Link to={{pathname: MAP, data: "feature"}} className= "hyperlinkstyle">Drive With Us</Link>
                    </div>

                    <div className= "rightcontent">
                        <p className= "contentHeading">
                            Autonomous Lane Map
                        </p>

                        <p className= "contentParagraph">
                            There’s a world of places around you waiting to be explored.
                            IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
                            selected from world map and do customizations in terms of adding traffic lights, signs
                            or signals and editing road lanes and road width manually. You can save customized ODR
                            along with all the customizations, which will be editable on reopening customized ODR.
                        </p>

                        <Link to={MAP} className= "hyperlinkstyle">Drive With Us</Link>
                    </div>

                    <div className= "leftcontent">
                        <p className= "contentHeading">
                            Autonomous Road Map
                        </p>

                        <p className= "contentParagraph">
                            There’s a world of places around you waiting to be explored.
                            IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
                            selected from world map and do customizations in terms of adding traffic lights, signs
                            or signals and editing road lanes and road width manually. You can save customized ODR
                            along with all the customizations, which will be editable on reopening customized ODR.
                        </p>

                        <Link to={MAP} className= "hyperlinkstyle">Drive With Us</Link>
                    </div>

                    <div className= "rightcontent">
                        <p className= "contentHeading">
                            Traffic Analytics
                        </p>

                        <p className= "contentParagraph">
                            There’s a world of places around you waiting to be explored.
                            IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
                            selected from world map and do customizations in terms of adding traffic lights, signs
                            or signals and editing road lanes and road width manually. You can save customized ODR
                            along with all the customizations, which will be editable on reopening customized ODR.
                        </p>

                        <Link to={MAP} className= "hyperlinkstyle">Drive With Us</Link>
                    </div>
                    
                </div>
            </div>
            
        )

    };
    
}
export default withRouter(FeatureDetails);