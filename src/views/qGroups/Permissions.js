import Breadcrumbs from '@components/breadcrumbs';

import {
    Card, CardBody, CardHeader, Button, Table, CustomInput, Col,
} from 'reactstrap';

import axios from 'axios'
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify'

const Permissions = props => {

    const {id} = props.match.params
    const {row} = props

    const [groupId, setGroupId] = useState(id)
    const [data, setData] = useState([])

    useEffect(_ => {
        if (id) {
            setGroupId(id)
        }
    }, [])

    const [priorityTitles, setPriorityTitles] = useState([])
    const [priorityNumbers, setPriorityNumbers] = useState([])

    const [priorityNumbersChecked, setPriorityNumbersChecked] = useState([])

    useEffect(_ => {
        if (priorityNumbersChecked.length !== 0) {
            priorityNumbersChecked.map(el => {
                try {
                    document.getElementById(el).checked = true
                } catch (err) {
                    location.reload()
                }
            })
        }
    }, [priorityNumbersChecked, groupId, id, row, data])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/job/get_priorities/')
                setPriorityTitles(res.data.data.titles)
                setPriorityNumbers(res.data.data.priority_numbers)
            } catch (err) {

            }
        })()
    }, [id, props, row])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/group/get_group_record/${groupId}/`)
                setPriorityNumbersChecked(res.data.data.permissions !== null ? res.data.data.permissions.split(',') : [])
                setData(res.data.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, props, row])

    const onSubmit = async _ => {
        try {
            const res = await axios.post(`/group/update_group_permissions/${groupId}/`, {
                permissions: priorityNumbersChecked.length !== 0 ? priorityNumbersChecked.join(",") : null
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
                        {priorityTitles.map((el, index) => {
                            return <th key={index}>{el}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {priorityNumbers.length !== 0 ? <tr>
                        {priorityNumbers.map((el, index) => {
                            return <td key={index} className='text-center'>
                                <CustomInput
                                    onChange={e => {
                                        e.target.checked ? setPriorityNumbersChecked([...priorityNumbersChecked, el]) : setPriorityNumbersChecked(priorityNumbersChecked.filter(item => item !== el))
                                    }}
                                    inline
                                    type='checkbox'
                                    id={el}
                                    label=''
                                    defaultValue={el}
                                />
                            </td>
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

export default Permissions