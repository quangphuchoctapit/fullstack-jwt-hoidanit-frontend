import React, { useState, useEffect } from 'react'
import { getUserAccount } from '../service/userService'

const UserContext = React.createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: "",
        account: {}
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

    const fetchUser = async () => {
        let dataServer = await getUserAccount()
        if (dataServer?.EC === 0) {
            let username = dataServer.DT.username
            let email = dataServer.DT.email
            let groupWithRoles = dataServer.DT.groupWithRoles
            let token = dataServer.DT.access_token

            let data = {
                isAuthenticated: true,
                token,
                account: { username, email, groupWithRoles }
            }
            setUser(data)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export { UserProvider, UserContext }
