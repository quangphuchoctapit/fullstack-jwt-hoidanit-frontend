import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'
import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register.js';
import Users from '../components/ManageUsers/Users.jsx';
import PrivateRoutes from './PrivateRoutes.js';

const AppRoutes = (props) => {
    const Projects = () => (
        <div>Projects</div>
    )
    return (
        <div>
            <Switch>
                <PrivateRoutes path='/users' component={Users} />
                <PrivateRoutes path='/projects' component={Projects} />
                <Route path='/project'>
                    contact
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/' exact>
                    home
                </Route>
                <Route path='*'>
                    404 Not Found
                </Route>
            </Switch>
        </div>
    );
}

export default AppRoutes;