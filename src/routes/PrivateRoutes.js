import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react'
import _ from 'lodash'
import {
    Switch,
    Route,
} from 'react-router-dom'
import { UserContext } from '../context/UserContext';


const PrivateRoutes = (props) => {
    let { user } = React.useContext(UserContext)


    if (user && user.isAuthenticated === true) {
        return (
            <div>
                <Route path={props.path} component={props.component} />
            </div>
        );
    } else {
        return (
            <>
                <Redirect to='login'></Redirect>
            </>
        )
    }
}

export default PrivateRoutes;