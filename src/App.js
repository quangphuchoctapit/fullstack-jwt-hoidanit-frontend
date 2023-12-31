import { useState, useEffect } from 'react'
import Nav from '../src/components/Navigation/Nav.js';
import AppRoutes from './routes/AppRoutes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
import './App.scss';
import {
  BrowserRouter as Router
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <AppRoutes />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>

  );
}

export default App;
