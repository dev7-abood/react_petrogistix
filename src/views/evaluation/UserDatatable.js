import DataTable from 'react-data-table-component';
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Eye} from 'react-feather'
import {Button, Card, CardBody, Badge} from 'reactstrap';

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const UserDatatable = _ => {

    const [users, setUsers] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/evaluation/get_users/')
                setUsers(res.data.data.users)
            } catch (err) {

            }
        })()
    }, [])

    const columns = [
        //     {
        //     name: 'Username', selector: row => row.username,
        // },
        {
            name: 'Name', selector: row => row.name,
        },
        // {
        //     name: 'Submitted',
        //     selector: row => 1 === 1 ? <Badge color='primary'>Is submitted</Badge> : <Badge color='secondary'>Not yet</Badge>
        // },
        //     {
        //     name: 'Job type', selector: row => row.job_type,
        // },
        //     {
        //     name: 'Rating', selector: row => `${row.rating}%`,
        // },
        //     {
        //     name: 'Email', selector: row => row.email,
        // },
        {
            name: 'Eval',
            selector: row => <Link to={`/evaluation/${row.id}/`}>
                <Eye size={17} className='mx-1'/>
            </Link>
        }]

    return (
        <DataTable
            noHeader
            columns={columns}
            data={users}
            className='react-dataTable'
        />
    )
}

export default UserDatatable