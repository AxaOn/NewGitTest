import React, { Component } from 'react';
import './App.css';
import "./styling/layout.css";
import Dashboard from './components/dashboard';
import { withRouter } from "react-router";

class App extends Component {
  
  render(){

    
  /*  return (
      <BrowserRouter>
      <div>
      <Navigation />
        <Switch>
        <Route path = "/" component = {Dashboard} exact/>
        <Route path = "/street" component = {Streetodr}/>
        <Route component={Error}/>
        </Switch>
      </div>
      </BrowserRouter>
      
    );
*/

    return (
      <div>
        <Dashboard/>
      </div>
    )
  }
  
  /*render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }*/
}

export default withRouter(App);
