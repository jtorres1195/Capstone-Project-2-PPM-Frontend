import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './frontend/Home';
import About from './frontend/About';
import Adopt from './frontend/Adopt';
import Navbar from './frontend/Navbar';
import Species from './frontend/Species';
import EmailSubscriptions from './frontend/EmailSubscriptions';
import Login from './frontend/Login';
import Signup from './frontend/Signup';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<About />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/species" element={<Species />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/emailsubscriptions" element={<EmailSubscriptions />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </Router>
  );
}

export default App;
