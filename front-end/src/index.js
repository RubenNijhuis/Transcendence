// React stuffs
import React from 'react';
import ReactDOM from 'react-dom/client';

// Routing
import { BrowserRouter } from "react-router-dom";

// Main component
import App from './App';

// Attaching the component to an existing component in the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering said component
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
