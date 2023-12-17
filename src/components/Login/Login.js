import React from 'react';
import './Login.scss'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import { checkLogin } from '../../service/userService';


const Login = (props) => {
    let history = useHistory()
    const handleCreateNewAccount = () => {
        history.push("/register")
    }

    useEffect(() => {
        let sessionData = sessionStorage.getItem('account')
        if (sessionData) {
            history.push('/')
            // window.location.reload()
        }
        else {
            history.push('/login')
        }
    }, [])

    const [phoneOrEmail, setPhoneOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const defaultValidInput = {
        isValidPhoneOrEmail: true,
        isValidPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    let checkValidFunction = () => {
        if (!phoneOrEmail) {
            setObjCheckInput({ ...defaultValidInput, isValidPhoneOrEmail: false })
            toast.error('Phone Or Email is required')
            return false
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error('Please enter a password')
            return false
        }
        // let requiredInputs = [phoneOrEmail, password]
        // let requiredParams = ['Email or Phone', 'Password']
        // for (let i = 0; i < requiredInputs.length; i++) {
        //     if (!requiredInputs[i]) {
        //         toast.error(`${requiredParams[i]} is required`)
        //         return false
        //     }
        // }   
        return true
    }
    const handleLogin = async () => {
        let checkValid = checkValidFunction()
        if (checkValid) {
            let response = await checkLogin(phoneOrEmail, password)
            let dataServer = response
            if (dataServer.EC === 0) {
                setObjCheckInput({ ...defaultValidInput, isValidPassword: true, isValidPhoneOrEmail: true })
                toast.success('Ok Successfully logged in')
                let sessionData = {
                    isAuthenticated: true,
                    token: 'fakeToken'
                }
                sessionStorage.setItem('account', JSON.stringify(sessionData))
                history.push('/users')
                window.location.reload()
            } else {
                toast.error(dataServer.EM)
            }
        }
    }
    const handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    }
    return (
        <div className='login-container pt-3'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 col-sm-7 d-none d-sm-block  mt-5'>
                        <div className='brand text-uppercase fs-2 fw-bold'>Tommy Le</div>
                        <div className='detail'>Tommy Le Tommy Le Tommy Le</div>
                    </div>
                    <div className='content-right d-flex flex-column col-12 col-sm-5 py-3 gap-3'>
                        <div className='d-sm-none d-sm-none text-center fs-3 fw-bold brand'>Tommy Le</div>
                        <label htmlFor='email'>Enter an email or phone number</label>
                        <input onChange={e => setPhoneOrEmail(e.target.value)} value={phoneOrEmail} id='email' placeholder='Enter email or phone number' type='text' className={objCheckInput.isValidPhoneOrEmail ? 'form-control' : 'form-control is-invalid'} />
                        <label htmlFor='password'>Enter your password</label>
                        <input
                            onKeyDown={e => handlePressEnter(e)}
                            onChange={e => setPassword(e.target.value)}
                            value={password} id='password'
                            placeholder='Password' type='password'
                            className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'><a href='#' className=' forgot-password'>Forgotten password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button onClick={() => handleCreateNewAccount()} className='btn btn-success'>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

// import React from 'react';
// import './Login.scss'

// const Login = (props) => {
//     return (
//         <div className='login-container py-3'>
//             <div className='container'>
//                 <div className='row px-3 px-sm-0'>
//                     <div className='content-left col-12 col-sm-7 d-none d-sm-block'>
//                         <div className='brand fs-2'>Tommy Le</div>
//                         <div className='detail'>Tommy Le Tommy Le Tommy Le</div>
//                     </div>
//                     <div className='content-right col-5 d-flex flex-column gap-3 col-12 col-sm-5 py-3'>
//                         <div className='brand fs-3 d-sm-none d-block text-center'>Tommy Le</div>
//                         <input placeholder='Email' type='text' className='form-control' />
//                         <input placeholder='Password' type='password' className='form-control' />
//                         <button className='btn btn-primary'>Login</button>
//                         <span className='text-center forgot-password'><a className='text-decoration-none' href='/'>Forgotten password?</a></span>
//                         <hr />
//                         <div className='text-center'>
//                             <button className='btn btn-success'>Create new account</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;