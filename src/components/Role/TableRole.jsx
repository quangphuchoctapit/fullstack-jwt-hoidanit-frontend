import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { getAllRoles, deleteARole } from '../../service/roleService'
import { toast } from 'react-toastify'

const TableRole = forwardRef((props, ref) => {
    const [roles, setRoles] = useState([])

    useImperativeHandle(ref, () => ({
        async fetchAllRolesAgain() {
            await fetchAllRoles()
        }
    }))


    useEffect(() => {
        fetchAllRoles()
    }, [])

    const fetchAllRoles = async () => {
        let data = await getAllRoles()
        if (data?.EC === 0) {
            setRoles(data.DT)
        }
        else {
            toast.error('somethidn went wrong')
        }
    }

    const handleDelete = async (id) => {
        let data = await deleteARole(id)
        if (data?.EC === 0) {
            toast.success('successfully deleted role')
            fetchAllRoles()
        }
        else {
            toast.error('somethidn went wrong')
        }
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles && roles.length > 0 ?
                        roles.map((role, index) => (
                            <tr >
                                <th scope="row">{index}</th>
                                <td>{role.url}</td>
                                <td>{role.description ? role.description : '-'}</td>
                                <td>
                                    <button onClick={() => handleDelete(role.id)} className=' btn btn-danger'><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </td>

                            </tr>
                        ))
                        :
                        <tr><td colSpan={5}>Not found users</td></tr>
                    }

                </tbody>
            </table>
        </div>
    )
})

export default TableRole
