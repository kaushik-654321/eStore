import React from 'react';
import './App.css';
import Navbar from './navbar';
import Hero from './HeroSection';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
    </div>
  );
};

export default App;
