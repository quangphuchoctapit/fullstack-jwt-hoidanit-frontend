import axios from 'axios'


const registerNewUser = (username, email, phone, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        username, email, phone, password
    })
}

export {
    registerNewUser
}