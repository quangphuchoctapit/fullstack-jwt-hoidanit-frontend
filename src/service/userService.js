import axios from '../setup/axios'


const registerNewUser = (username, email, phone, password) => {
    return axios.post('/api/v1/register', {
        username, email, phone, password
    })
}

const checkLogin = (phoneOrEmail, password) => {
    return axios.post('/api/v1/login', {
        phoneOrEmail, password
    })
}

const fetchAllUsers = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteAUser = (id) => {
    return axios.delete(`/api/v1/user/delete`, { data: { id: id } })
}

const fetchGroups = () => {
    return axios.get(`/api/v1/group/read`)
}


const CreateNewUser = (userData) => {
    return axios.post(`/api/v1/user/create`, { ...userData })
}


const updateUserInfo = (userData) => {
    return axios.put(`/api/v1/user/edit`, { ...userData })
}

const getUserAccount = () => {
    return axios.get(`/api/v1/account`)
}

export {
    registerNewUser, checkLogin, fetchAllUsers, deleteAUser,
    fetchGroups, CreateNewUser, updateUserInfo, getUserAccount
}