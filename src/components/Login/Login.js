import React from 'react';
import './Login.scss'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    let history = useHistory()
    const handleCreateNewAccount = () => {
        history.push("/register")
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
                        <input placeholder='Enter email or phone number' type='text' className='form-control' />
                        <input placeholder='Password' type='password' className='form-control' />
                        <button className='btn btn-primary'>Login</button>
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