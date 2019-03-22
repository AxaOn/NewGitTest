import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard';
import CustomOdr from "../custom_odr";
import { BASE_URL, MAP, PLOT, CUSTOM, HOME, FEATURE_DETAILS, LOGIN } from './routeConstants';
import MapContainer from '../map_container';
import PlotMap from '../plot_map';
import Home from '../home';
import FeatureDetails from '../feature_details';
import Login from '../login';
import MapCont from "../map_cont";

//all urls defined here
//BrowserRouter used for routing
//Switch used to route to more than 1 pages
//Components which want to route to particular page must NOT import it rather should import from "routeConstants.js" 

class AllRoutes extends Component {

    render() {

        return (
            
            <BrowserRouter>
                <Switch>
                    <Route exact path={BASE_URL} component={Dashboard} />
                    <Route exact path={CUSTOM} component={CustomOdr} />
                    <Route exact path={MAP} component={MapCont} />
                    <Route exact path={PLOT} component={PlotMap} />
                    <Route exact path={HOME} component={Home} />
                    <Route exact path={FEATURE_DETAILS} component={FeatureDetails} />
                    <Route exact path={LOGIN} component={Login} />
                </Switch>
            </BrowserRouter>
        );

    }

}

export default AllRoutes;