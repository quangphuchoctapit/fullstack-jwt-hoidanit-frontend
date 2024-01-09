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

const getRolesByGroup = (id) => {
    return axios.get(`/api/v1/role/by-group/${id}`)
}

const assignRolesToGroup = (data) => {
    return axios.post(`/api/v1/role/assign-to-group`, { data })
}



export {
    createNewRoles, getAllRoles, deleteARole, getRolesByGroup, assignRolesToGroup
}