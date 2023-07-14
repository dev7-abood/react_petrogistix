import DataTable from 'react-data-table-component';
import { Link, useHistory } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Eye} from 'react-feather'
import {Button, Card, CardBody} from 'reactstrap';

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import SubmitDatatable from "./SubmitDatatable";
import Breadcrumbs from '@components/breadcrumbs'

const QGroupDatatable = props => {

    const {user_id} = props.match.params

    const [groups, setGroups] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/evaluation/get_q_groups/${user_id}/`)
                setGroups(res.data.data.groups)
            } catch (err) {

            }
        })()
    }, [])

    const columns = [{
        name: 'Group Name', selector: row => row.name,
    }, {
        // history
        name: 'Show questions', selector: row => <Link to={`/set/evaluation/${row.id}/${user_id}/${row.name}/`}>
            <Eye size={17} className='mx-1'/>
        </Link>
    }]

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Evaluate the set of questions' breadCrumbParent='Dashboard'
                         breadCrumbActive='Evaluate the set of questions'/>
            <Card>
                <CardBody>
                    <DataTable
                        noHeader
                        columns={columns}
                        data={groups}
                        className='react-dataTable'
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default QGroupDatatable