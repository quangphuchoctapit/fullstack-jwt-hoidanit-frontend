import React, { useState } from 'react'

const UserContext = React.createContext({ name: '', auth: false })

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: true,
        token: "",
        account: {
            email: '',
            username: '',
            groupWithRoles: ''
        }
    })

    //login
    const loginContext = (userData) => {
        setUser(userData)
    }

    //logout
    const logoutContext = () => {
        setUser({
            name: '',
            auth: false
        })
    }

    return (
        <>
            <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export { UserProvider, UserContext }
