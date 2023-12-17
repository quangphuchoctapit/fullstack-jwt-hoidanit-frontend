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

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [dataModalUser, setDataModalUser] = useState({})

    const [actionModal, setActionModal] = useState("CREATE")

    useEffect(() => {
        fetchUserList()
    }, [currentPage])

    const fetchUserList = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit)
        console.log('check res: ', response)
        if (response && response && response.EC === 0) {
            setListUsers(response.DT.users)
            setTotalPages(response.DT.totalPages)
        }
    }

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1)
    }

    const handleEditUser = (user) => {
        setDataModalUser(user)
        setIsShowModalUser(true)
        setActionModal('UPDATE')
    }

    const handleDeleteUser = async (userData) => {
        setIsShowModalDelete(true)
        setDataModal(userData)
    }

    const handleClose = async () => {
        setIsShowModalDelete(false)
        setDataModal({})
        await fetchUserList()
        if (listUsers && listUsers.length === 1) {
            setCurrentPage(2)
        }
    }

    useEffect(() => {
        console.log('check current page: ', currentPage, 'totalPage: ', totalPages)

    }, [listUsers])

    const handleCloseModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUserList()
    }

    const handleCreateNewUser = () => {
        setIsShowModalUser(true)
        setActionModal('CREATE')
    }

    const confirmDeleteUser = async (data) => {
        let response = await deleteAUser(data.id)
        if (response && response && response.EC === 0) {
            await fetchUserList()
            setIsShowModalDelete(false)
            setDataModal({})
        } else {
            toast.error('Error... Cannot delete thisUser')
        }
    }

    const handleRefresh = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit)
        if (response && response && response.EC === 0) {
            setListUsers(response.DT.users)
            setTotalPages(response.DT.totalPages)
            setCurrentPage(1)
        }
    }

    return (
        <>
            <div className='users-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='users-table-header col-12 d-flex flex-column mt-3'>
                            <div className='text-center'><h2>Manage User</h2></div>
                            <div className="d-flex flex-column flex-sm-row-reverse gap-2 my-2">
                                <button onClick={() => handleRefresh()} className='btn btn-success'><i className="fa fa-refresh" aria-hidden="true"></i>  Refresh</button>
                                <button onClick={() => handleCreateNewUser()} className='btn btn-primary'> <i className=" fa fa-plus-circle" aria-hidden="true"></i> Add new User</button>
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
                                                <th scope="row">{(currentPage - 1) * currentLimit + index + 1}</th>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.Group ? user.Group.name : '-'}</td>
                                                <td>
                                                    <button onClick={() => handleEditUser(user)} className='mx-3 btn btn-warning'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                                    <button onClick={() => handleDeleteUser(user)} className=' btn btn-danger'><i className="fa fa-trash" aria-hidden="true"></i></button>

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
            </div >
            <ModalDelete isShow={isShowModalDelete}
                handleClose={handleClose}
                dataModal={dataModal}
                confirmDeleteUser={confirmDeleteUser}
            />
            <ModalUser isShow={isShowModalUser}
                handleClose={handleCloseModalUser}
                dataModalUser={dataModalUser}
                action={actionModal}
            // confirmDeleteUser={confirmDeleteUser}
            />
        </>
    );
}

export default Users;