import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode basename={process.env.PUBLIC_URL}>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
