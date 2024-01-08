import React, { useState, useEffect } from 'react'
import { fetchGroups } from '../../service/userService'
import { toast } from 'react-toastify'
import { getAllRoles, getRolesByGroup } from '../../service/roleService'
import _ from 'lodash'


const GroupRole = () => {
    const [listGroups, setListGroups] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [roles, setRoles] = useState([])
    const [assignedRolesByGroup, setAssignedRolesByGroup] = useState([])

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

    const getAllGroups = async () => {
        let res = await fetchGroups()
        if (res && res.EC === 0) {
            if (res.DT && res.DT.length > 0) {
                setListGroups(res.DT)
            }

        } else {
            toast.error(res.EM)
        }
    }
    useEffect(() => {
        getAllGroups()
    }, [])

    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let data = await getRolesByGroup(value)
            if (data?.EC === 0) {
                // console.log('check data: ', data.DT)
                // console.log('check listrole:', roles)
                let builtData = buildDataRolesByGroup(data.DT.Roles, roles)
                setAssignedRolesByGroup(builtData)
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, listRole) => {
        let result = []
        if (listRole?.length > 0) {
            listRole.map((item) => {
                let object = {}
                object.url = item.url
                object.id = item.id
                object.isAssigned = false
                if (groupRoles?.length > 0) {
                    object.isAssigned = groupRoles.some((item) => item.url === object.url)
                }
                result.push(object)
            })
        }
        return result
    }

    const handleOnChangeRolesByGroup = (value) => {
        const _assignedRolesByGroup = _.cloneDeep(assignedRolesByGroup)
        let modifyRole = _assignedRolesByGroup.findIndex(item => item.id === +value)
        console.log('check modifu:', modifyRole)
        if (modifyRole > -1) {
            _assignedRolesByGroup[modifyRole].isAssigned = !_assignedRolesByGroup[modifyRole].isAssigned
        }
        setAssignedRolesByGroup(_assignedRolesByGroup)
    }


    return (
        <div className='group-role-container'>
            <div className="container">
                <div className="row">
                    <div className="col-12 my-5"><h1>Group Role:</h1></div>
                    {/* <div className="col-12 my-5"><h1>Group Role:</h1></div> */}

                    <div className="my-3 col-6 form-control">
                        <label htmlFor="">Group-role</label>
                        <select className="form-select"
                            onChange={e => handleOnChangeGroup(e.target.value)}
                        >
                            <option value={''}>Select a group</option>

                            {listGroups?.length > 0 && listGroups.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    {selectGroup &&
                        <>
                            <div className="my-3 col-5">
                                {assignedRolesByGroup?.length > 0 && assignedRolesByGroup.map((item) => (
                                    <div key={item.id} className="form-check">
                                        <input type='checkbox' id={`check-${item.id}`} onChange={e => handleOnChangeRolesByGroup(e.target.value)} value={item.id} checked={item.isAssigned ? true : false} className=' form-check-input' />
                                        <label htmlFor={`check-${item.id}`} className='form-check-label'>{item.url}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="col-12">
                                <button className='btn btn-warning'>Save</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupRole
