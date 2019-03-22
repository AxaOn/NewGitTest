import React, { Component } from "react";
import ReactMapboxGl, { Layer, Marker, GeoJson, Feature, ZoomControl,ScaleControl, RotationControl } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from "./header";
import Footer from "./footer";
import { withRouter, Link } from 'react-router-dom';
import "../styling/layout.css";
import axios from "axios";
import { FEATURE_DETAILS, HOME } from "./router/routeConstants";
import { app_title } from "./constants/variable_constants";

// this component plots points i.e. longitude latitude on map

// 1st page flow is: " " (having csv data) -> "map_container" WITHOUT drawControl 
// 2nd type page flow is: "feature_details" -> "map_container" WITH drawControl (to select long lat) -> "map_container" WITHOUT drawControl

// ReactMapboxGl used for map
// Axios used for integrating frontend with backend i.e. post,get methods etc 
// DrawControl from mapboxgl used to select points from map by drawing boxes on map
// DrawControl is shown on top left corner of map 

// csv file data format:
// column 8: latitude
// column 9: longitude
// row 1: headings so dont use it 

//access token to access mapboxgl api
const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});
  



class MapCont extends Component {

    constructor(props) {

        super(props)
        this.state = {
            map_coordinates: this.props.location.data,          //fetches csv data OR "feature" stored in data variable according to previos page 
            // temp_cooridinates: []
        }
        document.title = app_title;

    }

    //built in method to mount backend with it
    componentDidMount(){
        
    }

    //send long lat coordinates to backend
    sendData () {
        
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.post("http://127.0.0.1:5000/gpspoints",
            { 'coordinates': this.state.map_coordinates }, config)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        
    }


    onClickButton(){

        // debugger;
        if (this.state.map_coordinates === "feature"){
            console.log("insideee");
            console.log(this.state.temp_cooridinates);
            console.log("next are...");
            var newval = this.state.temp_cooridinates;
            console.log(newval);
            // this.setState({map_coordinates: this.state.temp_cooridinates});
            // this.setState((prevState, props)=>(prevState.map_coordinates = newval));
            
            this.setState({map_coordinates: newval});
            console.log(this.state.map_coordinates);
            
        }

        this.sendData();
    }


    // function to display DrawControl on map 
    displayDrawControl(){

        if(this.state.map_coordinates === "feature")
        {
            return(
                <DrawControl
                    position="top-left"
                    onDrawCreate={this.onDrawCreate}
                    onDrawUpdate={this.onDrawUpdate}
                />
            );        
        }
        
    }

    //function to display circles on points
    displayLayer(plotcord){

        if (this.state.map_coordinates !== "feature")
        {
            return(
                    <Layer
                        type = "circle"
                        id = "points"
                        paint= {{
                            "circle-radius": {
                                stops: [
                                    [12, 2], 
                                    [22, 180]
                                ],
                                base: 2
                            },
                            "circle-color": "#3887be",
                            "circle-opacity": 0.5
                        }}
                    >
                   
                    {plotcord}
                    </Layer>  
            );
        }

    }

    
    //function to fetch and store coordinates from map when user makes box FIRST TIME
    //will allow to select only 4 points from map otherwise will generate alert
    onDrawCreate = ({ features }) => {
        
        var fetch = features[0].geometry.coordinates[0]             //fetch coordinates from map
        if (fetch.length !== 5)
        {
            alert("Please select only 4 points")
        }
        else
        {

            //below is working better
            var fetch = features[0].geometry.coordinates[0]

            console.log("feteched:::: " + fetch);
            console.log("feteched sizeeeeeeee:::: " + fetch.length);
            
            var new_cord = [];
            //new_cord.push(["longitude", "latitude"]);
            
            for (var c = 0; c < fetch.length-1; c++)
            {
                new_cord.push([fetch[c][1], fetch[c][0]]);
                // new_cord.push([fetch[c+1], fetch[c]]);
            }

            this.setState({ map_coordinates: new_cord })

            console.log(" seee: " + this.state.map_coordinates)

        }
         
    };

    //function to fetch and store coordinates from map when user UPDATES the points of map
    //will allow to select only 4 points from map otherwise will generate alert
    onDrawUpdate = ({ features }) => {
       
        var fetch = features[0].geometry.coordinates[0]
        if (fetch.length !== 5)
        {
            alert("Please select only 4 points")
        }
        else
        {
            var new_cord = [];
            new_cord.push(["longitude", "latitude"]);
            for (var c = 0; c < fetch.length; c++)
            {
                new_cord.push([fetch[c][1], fetch[c][0]]);
            }
            // this.setState({ map_coordinates: fetch })
            this.setState({ map_coordinates: new_cord })
            // this.setState({ temp_cooridinates: new_cord })
            
            // this.sendData();
        }

    };

    onMouseOver(event)
    {
        // var coord = event.features[0].geometry.coordinates.slice();
        //var coord = event.features;
        // console.log(event.lngLat);
        // const fetures = map.queryRenderedFeatures(event.features);
        // console.log(fetures);
        console.log(event);



    }

    onMouseOut()
    {
        
    }


    handleStyleLoad = map => (map.resize())

    render() {

        var long_data = [];                 //longitude points from csv
        var lat_data = [];                  //latitude points from csv
        var long_lat_cord = [];             //valid longitude latitude points format for plotting on map

        var plotcord = [];                  //coordinates to be plotted on map
        
        for (var i = 1; i < this.state.map_coordinates.length ; i++) {

            long_data.push(this.state.map_coordinates[i][9]);
            lat_data.push(this.state.map_coordinates[i][8]);
            long_lat_cord.push([this.state.map_coordinates[i][9], this.state.map_coordinates[i][8]]);
            // console.log(long_lat_cord);
        }

        for (var j = 0; j < long_lat_cord.length; j++) {
            plotcord.push(
                <Feature
                    coordinates={long_lat_cord[j]}
                    key={j}  
                    onClick={this.onMouseOver(this.state.map_coordinates[j]).bind(this)}           
                >
                </Feature>
            )
        }

        return (
            <div className="container-fluid" style={{height: '100vh'}}>

            <Header />
            <div className="row">
                <div className="col-sm-8 col-md-9">
                    <Map 
                        id="drawC"
                        style="mapbox://styles/mapbox/streets-v9" 
                        containerStyle={{
                            height: "100%",
                            width: "100%"
                        }}
                        center={long_lat_cord[0]}
                        onStyleLoad={this.handleStyleLoad}
                        // onClick = {this.onMouseOver.bind(this)}
                    >
                        <ZoomControl />
                        <ScaleControl />
                        <RotationControl style={{ top: 80 }} />
                        <DrawControl
                            position="top-left"
                            onDrawCreate={this.onDrawCreate}
                            onDrawUpdate={this.onDrawUpdate}
                        />
                      

                            <Layer
                                type="circle"
                                id="points"
                                paint={{
                                    "circle-radius": {
                                        stops: [
                                            [12, 2],
                                            [22, 180]
                                        ],
                                        base: 2
                                    },
                                    "circle-color": "#3887be",
                                    "circle-opacity": 0.5
                                }}
                            >

                                {plotcord}

                            </Layer>
                    </Map>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="card bg-light">
                        <div className="card-body">
                                <h4 className="card-title">Edit Map</h4>
                                <div className="dropdown btn-lg">
                                    <p>Select Option</p>
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown button
                                    <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" onSelect={Option} aria-labelledby="dropdownMenu">
                                        <a className="dropdown-item" href="#">Item</a>
                                        <a className="dropdown-item" href="#">Another item</a>
                                        <a className="dropdown-item" href="#">One more item</a>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6 col-md-6">
                                        <p>Latitude</p>
                                    </div>
                                    <div className="col-sm-6 col-md-6">
                                        <p>Longitude</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6 col-md-6">
                                        <input className="form-control" readOnly placeholder="latitude"></input>
                                    </div>
                                    <div className="col-sm-6 col-md-6">
                                        <input className="form-control" readOnly placeholder="longitude"></input>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
                


                
                {/* <div className="panel-default" role="navigation">

<div className="panel-heading">
    <span className="pull-left"></span>
    <p>heloooo</p>
    <p >message</p>
</div>
<div className="panel-body">

<div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenu">
    <a className="dropdown-item" href="#">Item</a>
    <a className="dropdown-item" href="#">Another item</a>
    <a className="dropdown-item" href="#">One more item</a>
  </div>
</div>
</div>
</div> */}


                

                {/* <nav className='navbar navbar-default'>
                <div  className = "navbar-header"> 

                <a className='navbar-brand' href='/'>Your Brand</a>

                </div>
                </nav>
                <div className="panel-default" role="navigation">

                    <div className="panel-heading">
                        <span className="pull-left"></span>
                        <p>heloooo</p>
                        <p >message</p>
                    </div>
                    <div className="panel-body">
                    </div>
                </div> */}



            {/* <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">

      

        <span className={`h1 mb-4 w-100 text-center text-${themeClass}`}>{ theme || 'Default' }</span>

        

        <div className="btn-group">

        

          <button type="button" className={`btn btn-${themeClass} btn-lg`}>{ theme || 'Choose' } Theme</button>

          

          <button type="button" className={`btn btn-${themeClass} btn-lg dropdown-toggle dropdown-toggle-split`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

            <span className="sr-only">Toggle Theme Dropdown</span>

          </button>

          

          <div className="dropdown-menu">

          

            <a className="dropdown-item" href="#" onClick={e => this.chooseTheme('Primary', e)}>Primary Theme</a>

            <a className="dropdown-item" href="#" onClick={e => this.chooseTheme('Danger', e)}>Danger Theme</a>

            <a class="dropdown-item" href="#" onClick={e => this.chooseTheme('Success', e)}>Success Theme</a>

            

            <div className="dropdown-divider"></div>

            

            <a className="dropdown-item" href="#" onClick={this.resetTheme}>Default Theme</a>

          </div>

          

        </div>

        
        </div> */}
      </div>
            );
    
        }         
    }

export default withRouter(MapCont);
