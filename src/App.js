import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Adopt from './components/Adopt';
import Navbar from './components/Navbar';
import Species from './components/Species';
import EmailSubscriptions from './components/EmailSubscriptions';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
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

export default App;
