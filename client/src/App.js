import React from 'react';    // { useState } 
import { BrowserRouter as Router, Route } from 'react-router-dom';


import PrivateRoute from './components/PrivateRouter';
import BubblePage from './components/BubblePage'; 
import Login from './components/Login';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <Route path ='/login' component={Login} />
        <PrivateRoute path='/bubbles-page' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
