import DataTable from 'react-data-table-component';
import {Link} from 'react-router-dom';
import Breadcrumbs from '@components/breadcrumbs';
import DeleteAlertModal from "@c/DeleteAlertModal";

import {
    MoreVertical, FileText, Trash2, Archive, ChevronDown
} from 'react-feather';

import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Row,
    Col,
    Label,
    CustomInput,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Alert
} from 'reactstrap';

import Create from "./Create";
import Edit from "./Edit";

import {useState, useEffect} from 'react';

const Q = _ => {

    const [createSidebarOpen, setCreateSidebarOpen] = useState(false)
    const [editSidebarOpen, setEditSidebarOpen] = useState(false)

    const createToggleSidebar = () => setCreateSidebarOpen(!createSidebarOpen)
    const editToggleSidebar = () => setEditSidebarOpen(!editSidebarOpen)

    const columns = [{
        name: 'Title', selector: row => row.title,
    }, {
        name: 'Status', selector: row => row.status,
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    onClick={editToggleSidebar}
                    className='w-100'
                >
                    <Archive size={14} className='mr-50'/>
                    <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                    <Trash2 size={14} className='mr-50'/>
                    <span className='align-middle'>Delete</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>)
    }];

    const data = [{
        id: 1, title: 'Beetlejuice', status: 'Active',
    }, {
        id: 2, title: 'Ghostbusters', status: 'Disabled',
    }]

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Questions' breadCrumbParent='Dashboard'
                         breadCrumbActive='Questions'/>
            <Card>
                <Create
                    open={createSidebarOpen}
                    toggleSidebar={createToggleSidebar}
                />
                <Edit
                    open={editSidebarOpen}
                    toggleSidebar={editToggleSidebar}
                />
                <CardBody>
                    <CardHeader>
                        <p>Questions</p>
                        <Button onClick={createToggleSidebar} color='primary'>Add New Question</Button>
                    </CardHeader>
                    <DataTable
                        noHeader
                        columns={columns}
                        data={data}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default Q