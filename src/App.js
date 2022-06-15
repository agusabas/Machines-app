import React from "react";
import logo from './logo.svg';
import './App.css';
import {Machine} from './Machine';
import {Machines} from './Machines';
import {BrowserRouter as Router, Route, Routes, NavLink, Navigate} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App container">
      <Routes>
        <Route path='/' element={<Navigate to="/machines" />}/>
        <Route path='/machines' element={<Machines />}/>
        <Route path='/machines/:id' element={<Machine />}/>
      </Routes>
    </div>
    </Router>
  );
}


export default App;
