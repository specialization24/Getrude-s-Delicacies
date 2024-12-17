import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

