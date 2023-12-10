import React from 'react';
import './Register.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { registerNewUser } from '../../service/userService';
import { toast } from 'react-toastify'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidRePassword: true,
        isValidPhone: true,
        isValidUsername: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    let history = useHistory()
    const handleGoToLogin = () => {
        history.push('/login')
    }

    const checkValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error('Email is required')
            return false
        }
        if (!phone) {
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
            toast.error('Phone is required')
            return false
        }
        if (!username) {
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false })
            toast.error('Username is required')
            return false
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error('Password is required')
            return false
        }
        if (!rePassword) {
            toast.error('Confirm Password is required')
            setObjCheckInput({ ...defaultValidInput, isValidRepassword: false })
            return false
        }
        let requiredInputs = [email, phone, username, password, rePassword]
        let requiredParams = ['Email', 'Phone', 'Username', "Password", 'Re-enter Password']
        let validParam = ['isValidEmail', 'isValidPhone', 'isValidUsername', "isValidPassword", 'isValidRePassword']
        if (password !== rePassword) {
            toast.error('Passwords do not match')
            return false
        }
        // for (let i = 0; i < requiredInputs.length; i++) {
        //     if (!requiredInputs[i]) {
        //         toast.error(`${requiredParams[i]} input is required`)
        //         let valueParam = validParam[0]
        //         console.log('check valei param: ', valueParam)
        //         setObjCheckInput({ ...defaultValidInput, valueParam: false })
        //         return false
        //     }
        // }


        return true
    }

    const handleRegister = async () => {
        let checkValid = checkValidInputs()
        if (checkValid) {
            let response = await registerNewUser(username, email, phone, password)
            let serverData = response.data.data
            console.log('data: ', serverData)
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/api-test').then((data) => {
            console.log('check data: ', data)
        })

    }, [])
    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row mx-1 mx-sm-0 pt-3'>
                    <div className='content-left mt-3 col-12 col-sm-7 d-none d-sm-block'>
                        <div className='brand fs-2 fw-bold'>Tommy Le</div>
                        <div className='detail'>Tommy Le Tommy Le Tommy Le</div>
                    </div>
                    <div className='content-right py-3 col-12 col-sm-5 d-flex flex-column gap-2'>
                        <div className='brand d-block d-sm-none text-center fs-4 fw-bold'>Tommy Le</div>
                        <label htmlFor='email'>Enter your email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email' id='email' />
                        <label htmlFor='phone'>Enter your phone number</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)} type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number' id='phone' />
                        <label htmlFor='username'>Enter your username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} type='text' className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'} placeholder='Username' id='username' />
                        <label htmlFor='password'>Enter your password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type='text' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password' id='password' />
                        <label htmlFor='re-password'>Confirm your password</label>
                        <input value={rePassword} onChange={e => setRePassword(e.target.value)} type='text' className={objCheckInput.isValidRePassword ? 'form-control' : 'form-control is-invalid'} placeholder='Re-enter your password' id='re-password' />
                        <button onClick={() => handleRegister()} className='mt-2 btn btn-primary'>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleGoToLogin()}>Already've an account. Login.</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;