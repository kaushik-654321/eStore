import React from 'react';
import './App.css';
import Navbar from './navbar';

import Footer from './pages/Footer';
import Copyright from './pages/Copyright';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage';
import Spinner from './Spinner';
import Shop from './pages/shop';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Spinner/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
        </Routes>

        <Footer />
        <Copyright />
      </Router>

    </div>
  );
};

export default App;
