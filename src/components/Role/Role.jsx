import React, { useState, useEffect } from 'react'
import './Role.scss'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'


const Role = () => {
    const [listChild, setListChild] = useState({
        child1: {
            url: '',
            description: ''
        }
    })

    const handleOnChangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[key][name] = value
        setListChild(_listChild)
    }

    const handleAddNewRole = () => {
        let _listChild = _.cloneDeep(listChild)
        _listChild[`child-${uuidv4()}`] = {
            url: '',
            description: ''
        }
        setListChild(_listChild)
    }

    const handleDelete = (key) => {
        let _listChild = _.cloneDeep(listChild)
        delete _listChild[key]
        setListChild(_listChild)
    }

    return (
        <>
            <div className="role-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center font-bold">Roles</h1>
                        </div>
                        <div className=" role-parent">
                            {Object.entries(listChild).map(([key, child], index) => {
                                return (

                                    <div key={key} className={`row role-child child-${key}`}>
                                        <div className="col-5 form-group">
                                            <label htmlFor="">URL:</label>
                                            <input value={child.url} type='text'
                                                onChange={(e) => handleOnChangeInput('url', e.target.value, key)}
                                                className='form-control' />
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
                                <button className="btn btn-warning">Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Role
