import React, { useState, useEffect } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'

const Nav = (props) => {
    const [isShow, setIsShow] = useState(false)
    let location = useLocation()
    useEffect(() => {
        if (location.pathname !== '/login') {
            setIsShow(true)
        }
    }, [])
    return (
        <>
            {isShow &&
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>
    )
}

export default Nav
