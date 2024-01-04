import React, { useState, useEffect } from 'react'
import { getUserAccount } from '../service/userService'
const UserContext = React.createContext(null)

const UserProvider = ({ children }) => {
    const location = window.location.pathname

    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }

    const [user, setUser] = useState(userDefault)

    //login
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
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
                account: { username, email, groupWithRoles },
                isLoading: false
            }
            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        if (location !== '/' || location !== '/login') {
            fetchUser()
        }
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
