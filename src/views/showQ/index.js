import DataTable from 'react-data-table-component';
import {Link} from 'react-router-dom';
import Breadcrumbs from '@components/breadcrumbs';
import {
    Eye, Download, Trash, MoreVertical, FileText, Trash2, Archive, ChevronDown
} from 'react-feather'

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {
    Card,
    CardBody,
    CardHeader,
    Badge
} from 'reactstrap';

import {useState, useEffect} from 'react';
import axios from 'axios'

const Datatable = _ => {

    const [data, setData] = useState([])
    const [userId, setUser] = useState(0)

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/question/show_available_group/')
                setData(res.data.data)
                console.log(res.data)
                setUser(res.data.user_id)
            } catch (err) {

            }
        })()
    }, [])

    const columns = [{
        name: 'Name', selector: row => row.name,
    }, {
        name: 'Submitted',
        selector: row => row.user_answering !== null ? row.user_answering.split(',').includes(userId) ?
                <Badge color='primary'>Is submitted</Badge> : <Badge color='secondary'>Not yet</Badge> :
            <Badge color='secondary'>Not yet</Badge>
    }, {
        name: 'Answers section', minWidth: '100px', cell: row => (<Link to={`/user/show/answers/${row.id}`}>
            <Eye size={17} className='mx-1'/>
        </Link>)
    }];

    return (<>
        <Breadcrumbs breadCrumbTitle='Questions' breadCrumbParent='Dashboard'
                     breadCrumbActive='Questions'/>
        <Card>
            <CardBody>
                <CardHeader>
                    <p>Questions</p>
                    {/*<Button onClick={createToggleSidebar} color='primary'>Add New Question</Button>*/}
                </CardHeader>
                <DataTable
                    noHeader
                    columns={columns}
                    data={data}
                    className='react-dataTable'
                />
            </CardBody>
        </Card>
    </>)
}

export default Datatable