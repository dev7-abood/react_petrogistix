import DataTable from 'react-data-table-component';
import {Button, Card, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom'
import {
    Eye
} from 'react-feather'
const Datatable = _ => {

    const columns = [{
        name: 'Name', selector: row => row.name,
    }, {
        name: 'Created at', selector: row => row.department,
    }, {
        name: 'Status',
        selector: row => <Link to={``}>
            <Eye size={17} className='mx-1'/>
        </Link>
    }]

    const data = [
        {
            name: 'test',
            department: 'department',
            status: "Status"
        }
    ]

    return (
        <>
            <Card>
                <CardBody>
                    <DataTable
                        columns={columns}
                        data={data}
                        className='react-dataTable'
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default Datatable