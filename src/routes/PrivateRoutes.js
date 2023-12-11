import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom'


const PrivateRoutes = (props) => {
    let history = useHistory()

    useEffect(() => {
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