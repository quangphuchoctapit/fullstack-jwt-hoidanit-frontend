import { useState, useEffect, useContext } from 'react'
import AppRoutes from './routes/AppRoutes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
import './App.scss';
import { Rings } from 'react-loader-spinner'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { UserContext } from './context/UserContext.js';
import NavHeader from '../src/components/Navigation/Nav.jsx';

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              heigth="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            />
            <div>Loading...</div>
          </div>
          :
          <div className="app-container">
            <NavHeader />
            <AppRoutes />
          </div>
        }
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
