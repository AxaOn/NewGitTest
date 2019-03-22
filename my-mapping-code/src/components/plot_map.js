import React, { Component } from 'react';
import { withRouter } from "react-router";
import Header from './header';
import Footer from './footer';
import "../styling/layout.css";
import { Scatter } from 'react-chartjs-2';
import { app_title } from "./constants/variable_constants";

class PlotMap extends Component {

    constructor(props) {

        super(props);
        this.state = {
            coordinates: this.props.location.data
        }
        document.title = app_title;
    }
    
    render() {

        var showRoadIddata = [];
        var xaxisdata = [];
        var yaxisdata = [];
        var roadIddata = [];
        var noOfLanesdata = [];
        var lanesWidth = [];
        var allLanesWidthdata = [];
        var cord = [];      //coordinates 

        //ingnore first row since it has headings 
        for (var i = 1; i < this.state.coordinates.length - 1; i++) {

                xaxisdata.push(this.state.coordinates[i][1]);
                yaxisdata.push(this.state.coordinates[i][2]);
                roadIddata.push(this.state.coordinates[i][5]);
                noOfLanesdata.push(this.state.coordinates[i][9]);
                cord.push({ "x": this.state.coordinates[i][1], "y": this.state.coordinates[i][2] });    
            
                var index = 10;
    
                for (var j = 0; j < this.state.coordinates[i][9]; j++){
                    lanesWidth.push(this.state.coordinates[i][index]);
                    index++;
                }
    
                allLanesWidthdata.push(lanesWidth);
                lanesWidth = [];
            
            }
    
        const pointdata = [];
        for (var k = 1; k < this.state.coordinates.length - 1; k++) {
            
            if (xaxisdata[k - 1] === xaxisdata[k]) {
                pointdata.push(0);
            }
            else {
                pointdata.push(10);
                showRoadIddata.push(roadIddata[k - 1]);
            }
        }
        
        var chartData = {
            
            datasets: [
                {
                    label: "Road Map",
                    borderColor: "yellow",
                    backgroundColor: "yellow",                    
                    borderWidth: 1,
                    pointBackgroundColor: "yellow",
                    data: cord,
                    pointRadius: pointdata,
                    pointHoverRadius: 5,
                    
                }
            ]
        }

        var chartOptions = {
            maintainAspectRatio: false,
            showLine: true,
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false,
                }]
            },

            tooltips: {
                mode: 'index',
                callbacks: {

                    afterLabel: function (tooltipItem, data) {
                        var label = ["Road ID: "+ Math.trunc(showRoadIddata[tooltipItem.index])];  
                        label.push("No. of lanes: " + noOfLanesdata[tooltipItem.index] );
                        
                        for (var i = 0; i < noOfLanesdata[tooltipItem.index]; i++)
                        {
                            label.push("Lane Section [" + "] width = " + allLanesWidthdata[tooltipItem.index][i]);       
                        }
                         return label;
                    }
                }  
            }
        }


        return (

            <div className="container">
                <Header />
                <div className="sidebar">
                    <ul>
                        <li>Edit Lane Width</li>
                    </ul>
                    <ul>
                        <li>Add/Drop Lanes</li>
                    </ul>
                    <ul>
                        <li>Add Traffic Signal/Sign</li>
                    </ul>
                </div>

                <div className="subcontainer">
                    <div className="scattergraph" >
                        <Scatter data={chartData} options={chartOptions} />
                    </div>
                </div>
                <Footer />
            </div>
        )

    }

}

export default withRouter(PlotMap);