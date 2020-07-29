import React from 'react';
import './App.css';
import Dash from './components/Dash';
import { Router } from '@reach/router';
import ViewTrip from './components/ViewTrip';
import TripList from './components/TripList';


function App() {
    
    

  return (
    <div className="App">
      <Router>

        <Dash path='/add_flight/:id'/>
        <ViewTrip path='/trip/:id'/>
        <TripList path='/my_Trips' default />

      </Router>
    </div>
  );
}

export default App;
