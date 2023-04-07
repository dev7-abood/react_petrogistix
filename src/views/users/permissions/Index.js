import {useEffect, useState} from 'react'
import {
    Col, Button, Table, CustomInput, Card, CardBody, Form
} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import UserInfoCard from "./UserInfoCard"
import axios from 'axios'
import {useParams} from "react-router-dom"
import {isObjEmpty} from '@utils'
import {toast} from 'react-toastify'

const index = _ => {

    const {id} = useParams();

    const [prems, setPrems] = useState({})

    const [activePermissions, setActivePermissions] = useState({})

    const [permissions, setPermissions] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/user/get_prems/')
                setPrems(res.data.permissions)
                setActivePermissions(res.data.active_permissions)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    useEffect(_ => {
        if (!isObjEmpty(activePermissions)) {
            for (const [key, value] of Object.entries(activePermissions)) {
                document.getElementById(key).checked = 'checked'
            }
        }
    }, [activePermissions])

    const changeCheckboxValue = (e, id) => {
        if (e.target.checked) {
            setPermissions([...permissions, e.target.value])
        } else {
            setPermissions(permissions.filter(item => item !== e.target.value))
            if (Object.prototype.hasOwnProperty.call(activePermissions, id)) {

            }
        }
    }

    const onSubmit = async _ => {
        const pers = []
        if (!isObjEmpty(activePermissions)) {
            for (const [key, value] of Object.entries(activePermissions)) {
                if (document.getElementById(key).checked) {
                    pers.push(document.getElementById(key).value)
                }
            }
        }

        const perms = [...pers, ...permissions]

        try {
            const res = await axios.post(`/user/set_perm_to_user/${id}`, {perms})
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Breadcrumbs breadCrumbTitle='Permissions' breadCrumbParent='Dashboard' breadCrumbActive='Permissions'/>
        {!isObjEmpty(prems) ? <Card>
            <CardBody>
                <UserInfoCard/>
                <Table borderless striped responsive>
                    <thead className='thead-light'>
                    <tr>
                        <th>Module</th>
                        <th>Add</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>view</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(prems).map((el, index) => {
                        return <tr key={index}>
                            <td className='text-uppercase'>{prems[index][4].model_name.replace('_', ' ')}</td>
                            <td>
                                <CustomInput type='checkbox' defaultValue={prems[index][0].codename}
                                             onChange={e => changeCheckboxValue(e, prems[index][0].id)}
                                             id={prems[index][0].id}
                                             label=''
                                />
                            </td>
                            <td>
                                <CustomInput type='checkbox' defaultValue={prems[index][1].codename}
                                             onChange={e => changeCheckboxValue(e, prems[index][1].id)}
                                             id={prems[index][1].id}
                                             label=''/>
                            </td>
                            <td>
                                <CustomInput type='checkbox' defaultValue={prems[index][2].codename}
                                             onChange={e => changeCheckboxValue(e, prems[index][2].id)}
                                             id={prems[index][2].id}
                                             label=''/>
                            </td>
                            <td>
                                <CustomInput type='checkbox' defaultValue={prems[index][3].codename}
                                             onChange={e => changeCheckboxValue(e, prems[index][3].id)}
                                             id={prems[index][3].id}
                                             label=''/>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
                <Col className='d-flex flex-sm-row flex-column p-2' sm='12'>
                    <Button.Ripple onClick={onSubmit} className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit'
                                   color='primary'>
                        Save Changes
                    </Button.Ripple>
                </Col>
            </CardBody>
        </Card> : ''}
    </>
    )
}

export default index