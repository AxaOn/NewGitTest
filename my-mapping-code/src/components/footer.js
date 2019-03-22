import React, {Component} from 'react';
import "../styling/layout.css";
import { withRouter } from "react-router";
import {PLOT} from '../components/router/routeConstants';

class Footer extends Component {
  
    render(){
      
      return (
        <div className = "bottombar">
            <button className = "btn-login" onClick ={()=>{this.props.history.push(PLOT)}}>Done</button>
        </div>
      )
    }

}

export default withRouter(Footer);