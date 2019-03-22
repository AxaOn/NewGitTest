import React from 'react';
import HeaderLogout from './header';
import "../styling/layout.css";
import { withRouter } from "react-router";
import { PLOT } from "../components/router/routeConstants";
import CSVReader from 'react-csv-reader';
import { app_title } from "./constants/variable_constants";

class CustomOdr extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      csvData: []
    };
    document.title = app_title;
    
  }

  goToPlotMap() {
  
    if (this.state.csvData.length > 0) {
      this.props.history.push(
        {
          pathname: PLOT,
          data: this.state.csvData
        }
      );

    }

    else{
      alert("choose file first");
    }

  }

  handleForce = files => {
  
    this.setState({ csvData: files });
  
  }

  render() {

    return (
      <div className="container">
        <HeaderLogout />
        <div className="upload-btn-wrapper">
          <CSVReader
            onFileLoaded={this.handleForce}
            onError={this.handleDarkSideForce}
            inputStyle={{ color: 'red' }}
          />
        </div>
        <button className="btn-red">Generate Path</button>
        <br />
        <button className="btn-plot" onClick={this.goToPlotMap.bind(this)}>Plot</button>
      </div>
    )
    
  }

}

export default withRouter(CustomOdr);