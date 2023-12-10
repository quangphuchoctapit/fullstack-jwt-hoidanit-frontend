import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react'

const Users = (props) => {
    let history = useHistory()
    useEffect(() => {
        let sessionData = sessionStorage.getItem('account')
        if (!sessionData) {
            history.push('/login')
        }
    }, [])
    return (
        <div>
            user components
        </div>
    );
}

export default Users;