import DataTable from 'react-data-table-component';
import Breadcrumbs from '@components/breadcrumbs';

import {
    MoreVertical, Trash2, Archive
} from 'react-feather';

import {
    Card,
    CardBody,
    CardHeader,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import Create from "./Create";
import Edit from "./Edit";
import axios from 'axios'
import {useState, useEffect} from 'react';
import DeleteAlertModal from "@c/DeleteAlertModal";
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Can from '@c/Can'

const Department = _ => {

    const [isUpdate, setIsUpdate] = useState(true)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteRout, setDeleteRout] = useState('')
    const toggle = () => setOpenDeleteModal(!openDeleteModal);

    const [data, setData] = useState([])
    const [editData, setEditData] = useState({})

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('department/list/')
                setData(res.data.results)
            } catch (err) {

            }
        })()
    }, [isUpdate])

    const [createSidebarOpen, setCreateSidebarOpen] = useState(false)
    const [editSidebarOpen, setEditSidebarOpen] = useState(false)

    const createToggleSidebar = () => setCreateSidebarOpen(!createSidebarOpen)
    const editToggleSidebar = row => {
        setEditSidebarOpen(!editSidebarOpen)
        setEditData(row)
    }

    const columns = [{
        name: 'Department Name', selector: row => row.name,
    }, {
        name: 'Status',
        selector: row => row.status === 1 ? <span className='text-success'>Active</span> :
            <span className='text-danger'>Disabled</span>,
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <Can have={['DEPARTMENTS_EDIT']}>
                    <DropdownItem
                        onClick={_ => editToggleSidebar(row)}
                        className='w-100'
                    >
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                </Can>
                <Can have={['DEPARTMENTS_DELETE']}>
                    <DropdownItem
                        className='w-100'
                        onClick={_ => {
                            toggle()
                            setDeleteRout(`/department/delete/${row.id}/`)
                        }}
                    >
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </Can>
            </DropdownMenu>
        </UncontrolledDropdown>)
    }];

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Departments' breadCrumbParent='Dashboard'
                         breadCrumbActive='Departments'/>
            <Card>
                <Create
                    open={createSidebarOpen}
                    toggleSidebar={createToggleSidebar}
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                    departments={data}
                />
                <Edit
                    open={editSidebarOpen}
                    toggleSidebar={editToggleSidebar}
                    editData={editData}
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                    departments={data}
                />
                <DeleteAlertModal
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    toggle={toggle}
                    deleteRout={deleteRout}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    departments={data}
                />
                <CardBody>
                    <CardHeader>
                        <p>Department</p>
                        <Can have={['DEPARTMENTS_ADD']}>
                            <Button onClick={createToggleSidebar} color='primary'>Add New Department</Button>
                        </Can>
                    </CardHeader>
                    <DataTable
                        noHeader
                        className='react-dataTable'
                        columns={columns}
                        data={data}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default Department