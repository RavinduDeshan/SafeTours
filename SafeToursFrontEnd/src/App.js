import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';

import Login from "./components/login"
import Reg from "./components/register"
import Footer from "./components/footer"
import Home from "./components/home.js"
import AddLocations from "./components/addLocations"
import AddBooking from "./components/addBooking"


const browserHistory = createBrowserHistory();

function App() {
    return (

        <Router>
            <Switch>

                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Reg}/>

                <Route path="/addLocations" component={AddLocations}/>
                <Route path="/book/:id" component={AddBooking}/>

              
             
                <Route path="/" component={Home}/>

            </Switch>

            <Footer/>

        </Router>
    )
}

export default App;
