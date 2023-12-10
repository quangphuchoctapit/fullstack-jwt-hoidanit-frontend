import { useState, useEffect } from 'react'
import Nav from '../src/components/Navigation/Nav.js';
import Login from '../src/components/Login/Login.js';
import Register from '../src/components/Register/Register.js';
import Users from '../src/components/ManageUsers/Users.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  const [account, setAccount] = useState({})
  useEffect(() => {
    let sessionData = sessionStorage.getItem('account')
    if (sessionData) {
      setAccount(JSON.parse(sessionData))
    }
    console.log('check account: ', account, 'isempty: ', !_.isEmpty(account), 'isauthenticated: ', account.isAuthenticated)
  }, [])
  return (
    <Router>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthenticated &&
          <Nav />
        }
        <Switch>

          <Route path='/news'>
            news
          </Route>
          <Route path='/contact'>
            contact
          </Route>
          <Route path='/about'>
            about
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/' exact>
            home
          </Route>
          <Route path='*'>
            404 Not Found
          </Route>
        </Switch>
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
