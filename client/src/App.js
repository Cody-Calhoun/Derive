import React from 'react';
import axios from 'axios';
import './App.css';
import Dash from './components/Dash';
import Login from './views/Login';
import {Link, Router, navigate} from '@reach/router';
import ViewTrip from './components/ViewTrip';
import TripList from './components/TripList';
import MapComp from './components/MapComp';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';

axios.interceptors.response.use(response => response, () => navigate('/login'));

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/login" default/>
        <Dash path='/add_flight/:id'/>
        <ViewTrip path='/trip/:id'/>
        <MapComp path='/explore' />
        <TripList path='/my_Trips'/>
        <Dashboard path='/user/dashboard'/>
        <RegistrationForm path='/user/register'/>
      </Router>

    </div>
  );
}

export default App;
