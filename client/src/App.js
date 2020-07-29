import React from 'react';

import './App.css';
import Dash from './components/Dash';
import Login from './views/Login';
import {Link, Router} from '@reach/router';
import ViewTrip from './components/ViewTrip';
import TripList from './components/TripList';

// axios.interceptors.response.use(response => response, () => navigate('/login'));

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="login"/>
        <Dash path='/add_flight/:id'/>
        <ViewTrip path='/trip/:id'/>
        <TripList path='/my_Trips' default />
      </Router>

    </div>
  );
}

export default App;
