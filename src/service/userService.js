import axios from 'axios'


const registerNewUser = (username, email, phone, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        username, email, phone, password
    })
}

const checkLogin = (phoneOrEmail, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        phoneOrEmail, password
    })
}

export {
    registerNewUser, checkLogin
}