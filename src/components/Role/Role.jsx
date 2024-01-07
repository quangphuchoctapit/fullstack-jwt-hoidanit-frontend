import React, { useState, useEffect, useRef } from 'react'
import './Role.scss'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createNewRoles } from '../../service/roleService'
import TableRole from './TableRole'

const Role = () => {
    const childRef = useRef()
    let dataChildDefault = {
        url: '',
        description: '',
        isValidUrl: true
    }
    const [listChild, setListChild] = useState({
        child1: dataChildDefault
    })

    const handleOnChangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[key][name] = value
        if (value && name === 'url') {
            _listChild[key]['isValidUrl'] = true
        }
        setListChild(_listChild)
    }

    const handleAddNewRole = () => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[`child-${uuidv4()}`] = dataChildDefault
        setListChild(_listChild)
    }

    const handleDelete = (key) => {
        let _listChild = _.cloneDeep(listChild)
        delete _listChild[key]
        setListChild(_listChild)
    }

    const buildDataToPersist = () => {
        let _listChild = _.cloneDeep(listChild)
        let result = []
        Object.entries(_listChild).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
            return result
        })
        return result
    }

    const handleSave = async () => {
        let _listChild = _.cloneDeep(listChild)
        let invalidUrl = Object.entries(_listChild).find(([key, child], index) => {
            return child && !child.url
        })
        if (!invalidUrl) {
            let data = buildDataToPersist()
            let response = await createNewRoles(data)
            if (response?.EC === 0) {
                toast.success(response.EM)
                childRef.current.fetchAllRolesAgain()
            }
            else {
                toast.error('Something went wrong')
            }

        } else {
            console.log('not valid url', invalidUrl)
            let key = invalidUrl[0]
            _listChild[key]['isValidUrl'] = false
            toast.error('Please enter a valid url')
            setListChild(_listChild)
        }

    }

    return (
        <>
            <div className="role-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center font-bold">Add Roles</h1>
                        </div>
                        <div className=" role-parent my-3">
                            {Object.entries(listChild).map(([key, child], index) => {
                                return (

                                    <div key={key} className={`row role-child child-${key}`}>
                                        <div className="col-5 form-group">
                                            <label htmlFor="">URL:</label>
                                            <input value={child.url} type='text'
                                                onChange={(e) => handleOnChangeInput('url', e.target.value, key)}
                                                className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'} />
                                        </div>
                                        <div className="col-5 form-group">
                                            <label htmlFor="">Description:</label>
                                            <input value={child.description}
                                                onChange={(e) => handleOnChangeInput('description', e.target.value, key)}
                                                type='text' className='form-control' />
                                        </div>
                                        <div className='actions col-2 mt-4 flex gap-3 items-center justify-center'>
                                            <i className="fa fa-plus-circle add text-primary" aria-hidden="true" onClick={handleAddNewRole}></i>
                                            {index >= 1 &&
                                                <i className="fa fa-trash-o delete text-danger" onClick={() => handleDelete(key)} aria-hidden="true"></i>
                                            }
                                        </div>
                                    </div>
                                )

                            })}
                            <div className="mt-3">
                                <button onClick={handleSave} className="btn btn-warning">Save</button>
                            </div>

                        </div>
                        <hr />
                        <div className="table-roles my-3">
                            <h1 className="text-center font-bold">Current roles</h1>
                            <TableRole ref={childRef} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Role
