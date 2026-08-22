import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import NewsTicker from './components/NewsTicker';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Details from './pages/Details';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/details" element={<Details />} />
        </Routes>
        <NewsTicker />
      </div>
    </BrowserRouter>
  );
}
