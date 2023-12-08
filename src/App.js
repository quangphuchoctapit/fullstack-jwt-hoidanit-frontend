import Nav from '../src/components/Navigation/Nav.js';
import Login from '../src/components/Login/Login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Nav /> */}
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
          <Route path='/' exact>
            home
          </Route>
          <Route path='*'>
            404 Not Found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
