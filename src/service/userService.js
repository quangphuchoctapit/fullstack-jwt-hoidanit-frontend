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

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteAUser = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete`, { data: { id: id } })
}

export {
    registerNewUser, checkLogin, fetchAllUsers, deleteAUser
}