import {useEffect, useState, Fragment} from 'react'
import {
    Col, Button, Table, CustomInput, Card, CardBody, Form, Alert
} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import UserInfoCard from "./UserInfoCard"
import axios from 'axios'
import {useParams} from "react-router-dom"
import {isObjEmpty} from '@utils'
import {toast} from 'react-toastify'

const index = _ => {

    const {id} = useParams();

    const [userSelectedPermeation, setUserSelectedPermeation] = useState([])
    const [permeationKeys, setPermeationKeys] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/c_permission/list/${id}/`)
                setPermeationKeys(res.data.data.keys)
                console.log(res.data.data.keys)
            } catch (err) {

            }
        })()
    }, [])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/c_permission/get_user_selected_permissions/?user_id=${id}`)
                setUserSelectedPermeation(res.data.data.types)
            } catch (err) {

            }
        })()
    }, [])

    useEffect(_ => {
        if (permeationKeys.length !== 0) {
            userSelectedPermeation.map(el => {
                try {
                    document.getElementById(el).checked = true
                } catch (err) {
                    location.reload()
                }
            })
        }
    }, [userSelectedPermeation, permeationKeys])

    const onSubmit = async _ => {
        try {
            const res = await axios.post(`/c_permission/set_permission/${id}/`, {
                items: userSelectedPermeation
            })
            toast.success('The Permission data has been saved.')
        } catch (err) {

        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='Permissions' breadCrumbParent='Dashboard' breadCrumbActive='Permissions'/>
        <Card>
            <Alert className='p-1' color='warning'>When [All] is selected, the user will be given all the Permissions and Rules.</Alert>
            <CardBody>
                <UserInfoCard userId={id}/>
                <Table borderless striped responsive>
                    <thead className='thead-light'>
                    <tr>
                        <th>MODEL NAME</th>
                        <th>READ</th>
                        <th>ADD</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {permeationKeys.length !== 0 ? <Fragment>
                        {permeationKeys.map((el, index) => {
                            return <tr key={index}>
                                <td className=''>{el.title}</td>
                                {el.can.map((el_can, index_can) => {
                                    if (!el_can.includes('NONE')) {
                                        return <td key={index_can + index_can}>
                                            <CustomInput type='checkbox' defaultValue={el_can}
                                                         id={el_can}
                                                         onChange={e => {
                                                             e.target.checked ? setUserSelectedPermeation([...userSelectedPermeation, el_can]) : setUserSelectedPermeation(userSelectedPermeation.filter(item => item !== el_can))
                                                         }}
                                                         label=''/>
                                        </td>
                                    } else {
                                        return <td key={index_can + index_can}></td>
                                    }
                                })}
                            </tr>
                        })}
                    </Fragment> : <tr></tr>}
                    </tbody>
                </Table>
                <Col className='d-flex flex-sm-row flex-column p-2' sm='12'>
                    <Button.Ripple onClick={onSubmit} className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit'
                                   color='primary'>
                        Save Changes
                    </Button.Ripple>
                </Col>
            </CardBody>
        </Card>
    </>)
}

export default index