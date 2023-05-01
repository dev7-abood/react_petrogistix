import {useEffect, useState, Fragment} from 'react'
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

    const [userData, setUserData] = useState([])
    const [userHasPermeation, setUserHasPermeation] = useState([])
    const [permeationKeys, setPermeationKeys] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/c_permission/list/${id}/`)
                setPermeationKeys(res.data.data.keys)

                // setPermeationKeys(res.data)

            } catch (err) {

            }
        })()
    }, [])

    const onSubmit = async _ => {

    }

    return (<>
        <Breadcrumbs breadCrumbTitle='Permissions' breadCrumbParent='Dashboard' breadCrumbActive='Permissions'/>
        <Card>
            <CardBody>
                {/*<UserInfoCard/>*/}
                <Table borderless striped responsive>
                    <thead className='thead-light'>
                    <tr>
                        <th>MODEL NAME</th>
                        <th>READ</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                        <th>UPDATE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {permeationKeys.length !== 0 ? <tr>
                        {permeationKeys.map((el, index) => {
                            return <Fragment key={index}>
                                <td className='text-uppercase'>{el.title}</td>
                                <td>
                                    <CustomInput type='checkbox' defaultValue={''}
                                                 id={''}
                                                 label=''/>
                                </td>
                            </Fragment>
                        })}
                    </tr> : <tr></tr>}
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