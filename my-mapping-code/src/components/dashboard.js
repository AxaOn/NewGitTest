import React, { Component } from 'react';
import "../styling/text_layout.css";
import "../styling/container_layout.css";
import "../styling/content_layout.css";
import { withRouter } from "react-router";
import Header from './header';
import { MAP, CUSTOM } from '../components/router/routeConstants';
import CSVReader from 'react-csv-reader';
import {Link} from "react-router-dom";
import { app_title } from "./constants/variable_constants";

// home page i.e. first page
// CSVReader package used to upload csv files
// css stylesheets used for formatting butons etc 

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      csv_data: []
    };
    document.title = app_title;
  }

  // go to .../customodr page  
  goToCustomodr = () => {

    this.props.history.push(CUSTOM);

  }

  //go to map_container page where csv data will be ploted on map
  // goToMapContainer() {

  //   this.props.history.push(MAP);
  // }

  //save files data in csv_data variable
  storeCsvFileData(files) {

    this.setState({ csv_data: files });

  }

  //generate alert if there is error in uploading file
  fileUploadError() {

    alert("Error in uploading file");

  }

  //go to map container component i.e. .../map page and send csv_data in "data" variable along with it 
  goToMapContainer() {

    if (this.state.csv_data.length > 0) {
      this.props.history.push(
        {
          pathname: MAP,
          data: this.state.csv_data
        }
      );
    }

    //if no file uploaded then generate alert
    else {
      alert("Choose csv file first");
    }

  }


  render() {
    return (

      <div >
        <div className="container">
          <Header />
          {/* 
                    <img src={require("../images/road.png")} className="roadimg"></img> 
                    <div className= "leftcontent">
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
                        <Link to={CUSTOM} className= "learnmore">Learn More</Link>
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
                        <Link to={CUSTOM} className= "learnmore">Learn More</Link>
                    </div> */}




          {/* <div className="upload-btn-wrapper">
            <CSVReader
              onFileLoaded={this.storeCsvFileData.bind(this)}
              onError={this.fileUploadError.bind(this)}
              inputStyle={{ color: 'red' }}
            />
          </div> */}





          {/* <button className="btn-blue" onClick={this.goToMapContainer.bind(this)}>Street ODR</button> */}







          {/* <button className="btn-red" onClick={this.goToCustomodr.bind(this)}>Customizable ODR</button>
          <p className="heading">IAI Mapping</p>
          <p className="paragraph">There’s a world of places around you waiting to be explored.
          IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
          selected from world map and do customizations in terms of adding traffic lights, signs
          or signals and editing road lanes and road width manually. You can save customized ODR
          along with all the customizations, which will be editable on reopening customized ODR.
                    </p>
          <button className="btn-plot" onClick={this.goToMapContainer.bind(this)}>Plot</button> */}
        








        <div className="upload-btn-wrapper">
            <CSVReader
              onFileLoaded={this.storeCsvFileData.bind(this)}
              onError={this.fileUploadError.bind(this)}
              inputStyle={{ color: 'red' }}
            />
          </div>
          <button className="btn-plot" onClick={this.goToMapContainer.bind(this)}>Plot</button>
          <div className = "generateodrdiv">
            <Link to={MAP} className= "hyperlinkstyle">Generate ODR</Link>
          </div>

          <div className = "customizeodrdiv">
            <Link to={MAP} className= "hyperlinkstyle">Customize ODR</Link>
          </div>

          <div className = "textdiv">
            <p className = "heading">IAI Mapping</p>
            <p className = "paragraph">
            There’s a world of places around you waiting to be explored.
          IAI Mapping allows you to generate high quality map in ODR(Open Drive) format of any particular area
          selected from world map and do customizations in terms of adding traffic lights, signs
          or signals and editing road lanes and road width manually. You can save customized ODR
          along with all the customizations, which will be editable on reopening customized ODR.
            </p>
          </div>

          
        </div>

      </div>

    )

  };

}
export default withRouter(Dashboard);