import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './frontend/Home';
import About from './frontend/About';
import Pets from './frontend/Pets';
import Navbar from './frontend/Navbar';
import AnimalTypes from './frontend/AnimalTypes';
import AnimalType from './frontend/AnimalType';
import EmailSubscriptions from './frontend/EmailSubscriptions';
import Login from './frontend/Login';
import Signup from './frontend/Signup';
import UserProfile from'./frontend/UserProfile';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<About />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/animalTypes/:type" element={<AnimalType />} />
        <Route path="/animalTypes" element={<AnimalTypes />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/emailsubscriptions" element={<EmailSubscriptions />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/userprofile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
