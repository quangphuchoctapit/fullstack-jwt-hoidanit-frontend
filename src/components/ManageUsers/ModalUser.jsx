import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import { fetchGroups, CreateNewUser } from '../../service/userService'
import _ from 'lodash'

const ModalUser = (props) => {
    const { dataModalUser, isShow, handleClose, action } = props

    const defaultUserData = {
        email: '',
        password: '',
        username: '',
        address: '',
        phone: '',
        selectedGroup: '',
        sex: ''
    }

    const defaultValidInputs = {
        email: true,
        password: true,
        username: true,
        address: true,
        phone: true,
        selectedGroup: true,
        sex: true
    }

    const listSex = [
        { id: 'male', name: 'Male' },
        { id: 'female', name: 'Female' },
        { id: 'other', name: 'Other' }
    ]

    const [validInputs, setValidInputs] = useState(defaultValidInputs)
    const [userData, setUserData] = useState(defaultUserData)
    const [listGroups, setListGroups] = useState([])

    useEffect(() => {
        getAllGroups()
    }, [])

    const getAllGroups = async () => {
        let res = await fetchGroups()
        if (res && res.data.EC === 0) {
            if (res.data.DT && res.data.DT.length > 0) {
                setListGroups(res.data.DT)
                setUserData({ ...userData, selectedGroup: res.data.DT[0].id, sex: listSex[0].id })
            }

        } else {
            toast.error(res.data.EM)
        }
    }

    useEffect(() => {
        console.log('check state: value: ', userData)
    }, [userData])

    useEffect(() => {
        if (action === 'CREATE') {
            if (listGroups && listGroups.length > 0) {
                setUserData({ ...userData, selectedGroup: listGroups[0].id, sex: listSex[0].id })
            }
        }
    }, [action])

    const handleOnChangeInput = (value, id) => {
        let _userData = _.cloneDeep(userData)
        _userData[id] = value
        setUserData(_userData)
    }


    useEffect(() => {
        console.log('cehck  data modal user: ', dataModalUser)
        let userData = dataModalUser
        setUserData({
            email: userData.email,
            address: userData.address ? userData.address : '',
            phone: userData.phone,
            username: userData.username,
            sex: userData.sex ? userData.sex : '',
            selectedGroup: userData.Group ? userData.Group.id : ''
        })
    }, [dataModalUser])

    const checkValidInputs = () => {
        setValidInputs(defaultValidInputs)
        let check = true
        let arr = ['email', 'username', 'phone', 'password', 'address', 'sex', 'selectedGroup']
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(defaultValidInputs)
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)
                check = false
                toast.error(`Please enter ${arr[i]}`)
                break
            }
        }
        return check
    }

    const confirmCreateUser = async () => {
        let check = checkValidInputs()
        console.log('check ', check)
        if (check === true) {
            let dataServer = await CreateNewUser({ ...userData, groupId: userData['selectedGroup'] })
            console.log('check dataServer: ', dataServer)
            if (dataServer.data && dataServer.data.EC === 0) {
                toast.success('Create new user successfully')
                handleClose()
                setUserData({ ...defaultUserData, selectedGroup: listGroups[0].id })

            } if (dataServer.data && dataServer.data.EC !== 0) {
                toast.error(dataServer.data.EM)

            }
        }
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"

                show={isShow}
                centered
                onHide={() => { handleClose(); setValidInputs(defaultValidInputs); setUserData(defaultUserData) }}
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{action === 'CREATE' ? 'Create a user' : "Update User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email">Email: (<span className='text-danger'>*</span>)</label>
                            <input disabled={action === 'CREATE' ? false : true} type="text" onChange={e => handleOnChangeInput(e.target.value, 'email')} value={userData.email} placeholder='Email' id='email' className={validInputs.email ? 'form-control' : 'form-control is-invalid'} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="useranme">Username: (<span className='text-danger'>*</span>)</label>
                            <input type="text" onChange={e => handleOnChangeInput(e.target.value, 'username')} value={userData.username} placeholder='Username' id='useranme' className={validInputs.username ? 'form-control' : 'form-control is-invalid'} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="phone">Phone: (<span className='text-danger'>*</span>)</label>
                            <input disabled={action === 'CREATE' ? false : true} type="text" onChange={e => handleOnChangeInput(e.target.value, 'phone')} value={userData.phone} placeholder='Phone' id='phone' className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            {action === 'CREATE' &&
                                <>
                                    <label htmlFor="password">Password: (<span className='text-danger'>*</span>)</label>
                                    <input type="text" onChange={e => handleOnChangeInput(e.target.value, 'password')} value={userData.password} placeholder='Password' id='password' className={validInputs.password ? 'form-control' : 'form-control is-invalid'} />
                                </>
                            }

                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label htmlFor="address">Address: (<span className='text-danger'>*</span>)</label>
                            <input type="text" onChange={e => handleOnChangeInput(e.target.value, 'address')} value={userData.address} placeholder='Address' id='address' className={validInputs.address ? 'form-control' : 'form-control is-invalid'} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="sex">Sex: (<span className='text-danger'>*</span>)</label>
                            <select
                                onChange={e => handleOnChangeInput(e.target.value, 'sex')}
                                type="text" value={userData.sex} placeholder='Group' id='sex' className={validInputs.sex ? 'form-select' : 'form-select is-invalid'} >
                                {listSex && listSex.length > 0 &&
                                    listSex.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="group">Group: (<span className='text-danger'>*</span>)</label>
                            <select
                                onChange={e => handleOnChangeInput(e.target.value, 'selectedGroup')}
                                type="text" value={userData.selectedGroup} placeholder='Group' id='group' className={validInputs.selectedGroup ? 'form-select' : 'form-select is-invalid'} >
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
                        onClick={() => { handleClose(); setValidInputs(defaultValidInputs); setUserData(defaultUserData) }}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={confirmCreateUser}
                    >
                        {action === 'CREATE' ? 'Add' : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser
