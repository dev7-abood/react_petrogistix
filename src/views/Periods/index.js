import DataTable from 'react-data-table-component';
import {
    Card, CardBody, CardHeader, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {
    MoreVertical, Trash2, Archive
} from 'react-feather'
import {useState, useEffect} from 'react'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Create from "./Create";
import Edit from "./Edit";
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs';
import DeleteAlertModal from "@c/DeleteAlertModal";
const Periods = _ => {

    const [isUpdate, setIsUpdate] = useState(true)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteRout, setDeleteRout] = useState('')

    const toggle = () => setOpenDeleteModal(!openDeleteModal);
    const createToggleSidebar = () => setCreateSidebarOpen(!createSidebarOpen)
    const [editData, setEditData] = useState({})

    const editToggleSidebar = row => {
        setEditSidebarOpen(!editSidebarOpen)
        setEditData(row)
    }

    const [createSidebarOpen, setCreateSidebarOpen] = useState(false)
    const [editSidebarOpen, setEditSidebarOpen] = useState(false)

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/period/list/`)
                setData(res.data.results)
            } catch (err) {

            }
        })()
    }, [isUpdate])

    const columns = [{
        name: 'Period Name', selector: row => row.title,
    }, {
        name: 'Status',
        selector: row => row.status === 1 ? <span className='text-success'>Active</span> :
            <span className='text-danger'>Disabled</span>,
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown direction={'down'}>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    onClick={_ => editToggleSidebar(row)}
                    className='w-100'
                >
                    <Archive size={14} className='mr-50'/>
                    <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={_ => {
                        toggle()
                        setDeleteRout(`/period/delete_period/${row.id}/`)
                    }}
                >
                    <Trash2 size={14} className='mr-50'/>
                    <span className='align-middle'>Delete</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>)
    }]

    const [data, setData] = useState([])

    return (<>
        <Breadcrumbs breadCrumbTitle='Periods' breadCrumbParent='Dashboard'
                     breadCrumbActive='Periods'/>
        <Card className='pb-3'>
            <Create
                open={createSidebarOpen}
                toggleSidebar={createToggleSidebar}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
            />
            <Edit
                open={editSidebarOpen}
                toggleSidebar={editToggleSidebar}
                editData={editData}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
            />
            <DeleteAlertModal
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                toggle={toggle}
                deleteRout={deleteRout}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
            />

            <CardBody>
                <CardHeader>
                    <p></p>
                    <Button onClick={createToggleSidebar} siz={'sm'} color='primary'>Add New</Button>
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

export default Periods