import React from 'react';
import Header from './components/Header';
import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
