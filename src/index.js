import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'lvq';
import { themeConfig } from './lib';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider themeConfig={themeConfig}>
      <App />
      <ToastContainer />
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
