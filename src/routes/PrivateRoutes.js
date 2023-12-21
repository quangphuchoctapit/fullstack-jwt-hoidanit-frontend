import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom'
import { UserContext } from '../context/UserContext';


const PrivateRoutes = (props) => {
    let { user } = React.useContext(UserContext)

    let history = useHistory()

    useEffect(() => {
        console.log('check suer: ', user)
        let sessionData = sessionStorage.getItem('account')
        if (!sessionData) {
            history.push('/login')
            window.location.reload()
        }
    }, [])
    return (
        <div>
            <Route path={props.path} component={props.component} />
        </div>
    );
}

export default PrivateRoutes;