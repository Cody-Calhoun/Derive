import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './views/Login';
import {Link, Router} from '@reach/router';

// axios.interceptors.response.use(response => response, () => navigate('/login'));

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="login"/>
      </Router>
      
      
    </div>
  );
}

export default App;
