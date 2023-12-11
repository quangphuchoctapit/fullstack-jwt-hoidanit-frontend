import React, { useState, useEffect } from 'react';
import './Users.scss'
import { fetchAllUsers } from '../../service/userService';
const Users = (props) => {
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchUserList()
    }, [])

    const fetchUserList = async () => {
        let response = await fetchAllUsers()
        // console.log('check response: ', response)
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT)
            console.log('check data: ', response.data.DT)
        }
    }
    return (
        <div className='users-container'>
            <div className='container'>
                <div className='row'>
                    <div className='users-table-header col-12 d-flex flex-column mt-3'>
                        <div className='text-center'><h2>User list</h2></div>
                        <div className="d-flex flex-column flex-sm-row-reverse gap-2 my-2">
                            <button className='btn btn-success'>Refresh</button>
                            <button className='btn btn-primary'>Add new User</button>
                        </div>
                    </div>
                    <div className='users-table'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    listUsers.map((user) => (
                                        <tr key={listUsers.id}>
                                            <th scope="row">{user.id}</th>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.Group ? user.Group.name : '-'}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr><td colSpan={5}>Not found users</td></tr>
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='users-users-pagination d-flex justify-content-center mt-5'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;