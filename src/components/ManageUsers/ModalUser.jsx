import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import { fetchGroups } from '../../service/userService'


const ModalUser = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedGroup, setSelectedGroup] = useState('')
    const [sex, setSex] = useState('')



    const [listGroups, setListGroups] = useState([])

    useEffect(() => {
        getAllGroups()
        console.log('check grous: ', listGroups)
    }, [])

    const getAllGroups = async () => {
        let res = await fetchGroups()
        console.log('cehck res: ', res)
        if (res && res.data.EC === 0) {
            setListGroups(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"

                show={true} centered
                onHide={props.handleClose}
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email">Email: (<span className='text-danger'>*</span>)</label>
                            <input type="text" placeholder='Email' id='email' className='form-control' />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="useranme">Username: (<span className='text-danger'>*</span>)</label>
                            <input type="text" placeholder='Username' id='useranme' className='form-control' />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="phone">Phone: (<span className='text-danger'>*</span>)</label>
                            <input type="text" placeholder='Phone' id='phone' className='form-control' />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="password">Password: (<span className='text-danger'>*</span>)</label>
                            <input type="text" placeholder='Password' id='password' className='form-control' />
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label htmlFor="address">Address: (<span className='text-danger'>*</span>)</label>
                            <input type="text" placeholder='Address' id='address' className='form-control' />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="sex">Sex: (<span className='text-danger'>*</span>)</label>
                            <select type="text" placeholder='Group' id='sex' className='form-select' >
                                <option defaultValue value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="group">Group: (<span className='text-danger'>*</span>)</label>
                            <select type="text" placeholder='Group' id='group' className='form-select' >
                                {listGroups && listGroups.length > 0 &&
                                    listGroups.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={props.handleClose}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => props.confirmDeleteUser(props.dataModal)}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser
