import React, { useState, useEffect, useContext } from 'react'
import './Nav.scss'
import { NavLink, useLocation, Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOutUser } from '../../service/userService';
import { toast } from 'react-toastify'

const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext)
    let location = useLocation()
    const history = useHistory()

    const handleLogout = async () => {
        let data = await logOutUser()
        localStorage.removeItem('jwt')
        logoutContext()

        if (+data?.EC === 0) {
            toast.success('logout succeeded')
            history.push('/login')

        } else {
            toast.error('error from server')
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                {/* <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div> */}


                <div className='nav-header'>
                    <Navbar expand='md' className="bg-header">
                        <Container>
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className='nav-link' to="/" exact>Home</NavLink>
                                    <NavLink className='nav-link' to="/users">Users</NavLink>
                                    <NavLink className='nav-link' to="/roles">Roles</NavLink>
                                    <NavLink className='nav-link' to="/projects">Projects</NavLink>
                                    <NavLink className='nav-link' to="/about">About</NavLink>

                                </Nav>
                                <Nav>
                                    {user?.isAuthenticated ?
                                        <>
                                            <Nav.Item className='nav-link'>Welcome {user.account.username}</Nav.Item>
                                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.2">
                                                    Change password
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="#action/3.4">
                                                    <span onClick={handleLogout}>Logout</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link to='/login' className='nav-link'>Log in</Link>

                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default NavHeader
