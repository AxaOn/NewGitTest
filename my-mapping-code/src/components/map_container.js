import React, { Component } from "react";
import ReactMapboxGl, { Layer, Marker, GeoJson, Feature, ZoomControl,ScaleControl, RotationControl } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from "./header";
import Footer from "./footer";
import { withRouter } from 'react-router-dom';
import "../styling/layout.css";
import "../styling/container_layout.css";
import axios from "axios";
import { FEATURE_DETAILS } from "./router/routeConstants";
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
  
class MapContainer extends Component {

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
        // axios.get('http://127.0.0.1:5000/')
        // .then(response => {
        //   this.setState({ itemm: response.data });
        //   console.log(response.data);
        //   console.log("helooooo");
        // })
        // .catch(function (error) {
        //   console.log(error);
        // })
        
        //this.sendData();
        
        console.log("history is: "+this.state.itemm);
        console.log("dataa is: "+this.state.csv_coordinates);
        
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

        // this.sendData();
    }

    
    onClickBtn(){

        // if (this.state.map_coordinates === "feature"){
        //     console.log("insideee");
        //     console.log(this.state.temp_cooridinates);
        //     console.log("next are...");
        //     var newval = this.state.temp_cooridinates;
        //     this.setState({map_coordinates: newval});
        //     console.log(this.state.map_coordinates);
            
        // }
        
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

    //function to display complete map page  
    // displayMapPage(){

    //     return(
            
    //         <div className="container">
    //             <Header/>
    //             <Map
    //                 id="drawC"
    //                 style="mapbox://styles/mapbox/streets-v9" 
    //                 containerStyle={{
    //                     height: "85%",
    //                     width: "100%"
    //                 }}
    //                 center ={long_lat_cord[1]}
    //             >
            
    //                {<DrawControl
    //     position="top-left"
    //     onDrawCreate={this.onDrawCreate}
    //     onDrawUpdate={this.onDrawUpdate}
    // />}


    //                 <Layer
    //                     type = "circle"
    //                     id = "points"
    //                     paint= {{
    //                         "circle-radius": {
    //                             stops: [
    //                                 [12, 2], 
    //                                 [22, 180]
    //                             ],
    //                             base: 2
    //                         },
    //                         "circle-color": "#3887be",
    //                         "circle-opacity": 0.5
    //                     }}
    //                 >
                   
    //                 {plotcord}
    //                 </Layer>                        
    //             </Map>
    //             <button onClick={this.onClickButton.bind(this)}>next send</button>
    //             <Footer />
    //         </div>
    //     )

    // }

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
            // var new_cord = [];
            // for (var c = 0; c < fetch.length; c++)
            // {
            //     new_cord.push([fetch[c][1], fetch[c][0]]);
            // }
            // if (this.state.map_coordinates === "feature")
            // {
            //     this.setState({ temp_cooridinates: new_cord })
            // }

            // else
            // {
            //     this.setState({ map_coordinates: new_cord })
            // }

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

    render() {

        var longdata = [];

        var latdata = [];

        var cord = [];



        var plotcord = [];

        

        for (var i = 1; i < this.state.coordinates.length - 1; i++) {



            longdata.push(this.state.coordinates[i][1]);

            latdata.push(this.state.coordinates[i][0]);

            cord.push([this.state.coordinates[i][1], this.state.coordinates[i][0]]);



        }

        

        for (var j = 0; j < cord.length-1; j++)

        {

            plotcord.push(

                <Feature  

                    coordinates ={cord[j]}

                    key ={j}

                >

                </Feature>    

                   

            )

        }



       // this.sendData();



        console.log(cord[0]);

        return (

            <div className="container">
                <Header/>
                <Map
                    id="drawC"
                    style="mapbox://styles/mapbox/streets-v9" 
                    containerStyle={{
                        height: "85%",
                        width: "100%"
                    }}
                    center ={this.state.coordinates[0]}
                >
                    <ZoomControl/>
                    <ScaleControl/>
                    <RotationControl style={{ top: 80 }}/>
                    <DrawControl
                    position="top-left"
                    onDrawCreate={this.onDrawCreate}
                    onDrawUpdate={this.onDrawUpdate}
                    />

                </Map>
                <Footer />
            </div>

        );

    }

}

export default withRouter(MapContainer);
