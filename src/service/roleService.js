import axios from '../setup/axios'

const createNewRoles = (data) => {
    return axios.post(`/api/v1/role/create`, [...data])
}

const getAllRoles = () => {
    return axios.get(`/api/v1/role/read`,)
}

const deleteARole = (id) => {
    return axios.delete(`/api/v1/role/delete`, { data: { id: id } })
}


export {
    createNewRoles, getAllRoles, deleteARole
}