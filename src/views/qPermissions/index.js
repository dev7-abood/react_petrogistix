import Breadcrumbs from '@components/breadcrumbs';

import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Table,
    CustomInput,
    Col,
} from 'reactstrap';

import axios from 'axios'
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify'

const QPermissions = props => {

    const {id} = props.match.params

    useEffect(_ => {
        console.log(props)
    }, [props])

    const [priorities, setPriorities] = useState([])
    const [prioritiesChecked, setPrioritiesChecked] = useState([])

    const [data, setData] = useState({})

    useEffect(_ => {
        prioritiesChecked.map(el => {
            console.log(el)
            document.getElementById(el).checked = true
        })
    }, [priorities])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/group/get_group_record/${id}/`)
                setPrioritiesChecked(res.data.data.permissions.split(','))
                setData(res.data.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/job/get_priorities/')
                setPriorities(res.data.data.priorities)
            } catch (err) {

            }
        })()
    }, [])


    const onSubmit = async _ => {
        try {
            const res = await axios.post(`/group/update_group_permissions/${id}/`, {
                permissions: prioritiesChecked.join(",")
            })
            toast.success('Group permissions have been updated!')
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='Permissions' breadCrumbParent='Dashboard' breadCrumbActive='Permissions'/>
        <Card>
            <CardHeader>
                Group Name:&nbsp;&nbsp;{data.name}
            </CardHeader>
            <CardBody>
                <Table borderless striped responsive>
                    <thead className='thead-light'>
                    <tr>
                        {priorities.map((el, index) => {
                            return <th key={index}>{el}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {priorities.map((el, index) => {
                            return <td key={index} className='text-center'>
                                <CustomInput
                                    onChange={e => e.target.checked ? setPrioritiesChecked([...prioritiesChecked, el]) : setPrioritiesChecked(prioritiesChecked.filter(item => item !== el))}
                                    inline
                                    type='checkbox'
                                    id={el}
                                    label=''
                                    defaultValue={el}
                                />
                            </td>
                        })}
                    </tr>
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

export default QPermissions