import DataTable from 'react-data-table-component'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Row, Col} from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const StatisticsDatatable = _ => {
    const [users, setUsers] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/evaluation/get_users_for_manager/')
                setUsers(res.data.data.users)
            } catch (err) {

            }
        })()
    }, [])

    const columns = [{
        name: '#', selector: (row, index) => index + 1,
        maxWidth: "60px"
    }, {
        name: 'Names', selector: row => <Link to={`/show-results/${row.id}/`}>
            {row.name}
        </Link>
    }, {
        name: 'Job', selector: row => row.job_type
    }, {
        name: 'Departments', selector: row => <div title={row.department_names}>{row.department_names}</div>
    }]

    return (
        <div>
            <h3 className='m-1 mb-2'>Manager Statistics</h3>
            <DataTable
                noHeader
                columns={columns}
                data={users}
                className='react-dataTable'
            />
        </div>
    )
}

export default StatisticsDatatable