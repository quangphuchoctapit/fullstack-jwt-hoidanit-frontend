import React from 'react';
import './Login.scss'

const Login = (props) => {
    return (
        <div class='login-container mt-3 '>
            <div className='container'>
                <div className='row'>
                    <div className='content-left red col-7'>
                        <div className='title'>TommyLe</div>
                        <div className='detail'>Content content content content</div>

                    </div>
                    <div className='content-right py-3 col-5 d-flex flex-column gap-3'>
                        <input type='text' placeholder='Email' className='email form-control' />
                        <input type='password' placeholder='Password' className='password form-control' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>Forgotten password?</span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new account</button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;