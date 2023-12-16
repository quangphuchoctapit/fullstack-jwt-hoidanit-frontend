import React, { useState, useEffect } from 'react';
import './Users.scss'
import { fetchAllUsers, deleteAUser } from '../../service/userService';
import ReactPaginate from 'react-paginate'
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

import { toast } from 'react-toastify'

const Users = (props) => {
    const [listUsers, setListUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUser, setIsShowModalUser] = useState(false)

    const [dataModal, setDataModal] = useState({})


    useEffect(() => {
        console.log('check currentpage ')
        fetchUserList()
    }, [currentPage])

    const fetchUserList = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit)
        // console.log('check response: ', response)
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT.users)
            setTotalPages(response.data.DT.totalPages)
        }
    }

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1)
    }

    const handleEditUser = (userId) => {
        console.log('check edit, ', userId)
    }

    const handleDeleteUser = async (userData) => {
        setIsShowModalDelete(true)
        setDataModal(userData)
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }

    const confirmDeleteUser = async (data) => {
        console.log('check delete, ', data)
        let response = await deleteAUser(data.id)
        if (response && response.data && response.data.EC === 0) {
            await fetchUserList()
            setIsShowModalDelete(false)
            setDataModal({})
        } else {
            toast.error('Error... Cannot delete thisUser')
        }
    }

    return (
        <>
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
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers && listUsers.length > 0 ?
                                        listUsers.map((user, index) => (
                                            <tr key={`row ${index}`}>
                                                <th scope="row">{user.id}</th>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.Group ? user.Group.name : '-'}</td>
                                                <td>
                                                    <button onClick={() => handleEditUser(user)} className='mx-3 btn btn-warning'>Edit</button>
                                                    <button onClick={() => handleDeleteUser(user)} className=' btn btn-danger'>Delete</button>

                                                </td>

                                            </tr>
                                        ))
                                        :
                                        <tr><td colSpan={5}>Not found users</td></tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                        {totalPages > 0 &&
                            <div className="user-footer d-flex justify-content-center">
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPages}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }

                    </div>
                </div>
            </div>
            <ModalDelete isShow={isShowModalDelete}
                handleClose={handleClose}
                dataModal={dataModal}
                confirmDeleteUser={confirmDeleteUser}
            />
            <ModalUser isShow={isShowModalDelete}
                handleClose={handleClose}
                dataModal={dataModal}
                confirmDeleteUser={confirmDeleteUser}
            />
        </>
    );
}

export default Users;