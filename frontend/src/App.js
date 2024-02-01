import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Adopt from './Adopt';
import Navbar from './Navbar';
import Species from './Species';
import EmailSubscriptions from './EmailSubscriptions';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/adopt" component={Adopt} />
        <Route path="/species" component={Species} />
        <Route path="/navbar" component={Navbar} />
        <Route path="/emailsubscriptions" component={EmailSubscriptions} />
      </Routes>
    </Router>
  );
}
