import React from 'react';
import './Register.scss'
import { useHistory } from 'react-router-dom'
const Register = (props) => {
    let history = useHistory()
    const handleGoToLogin = () => {
        history.push('/login')
    }
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
                        <input type='text' className='form-control' placeholder='Email' id='email' />
                        <label htmlFor='phone'>Enter your phone number</label>
                        <input type='text' className='form-control' placeholder='Phone number' id='phone' />
                        <label htmlFor='username'>Enter your username</label>
                        <input type='text' className='form-control' placeholder='Username' id='username' />
                        <label htmlFor='password'>Enter your password</label>
                        <input type='text' className='form-control' placeholder='Password' id='password' />
                        <label htmlFor='re-password'>Confirm your password</label>
                        <input type='text' className='form-control' placeholder='Re-enter your password' id='re-password' />
                        <button className='mt-2 btn btn-primary'>Register</button>
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