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
import Can from '@c/Can'
import dateFormat, {masks} from "dateformat";

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
        name: 'Start time',
        selector: row => row.start_timestamp !== null ? dateFormat(row.start_timestamp, "UTC:dd/mmm/yyyy, hh:MM TT") : '-',
    }, {
        name: 'Close time',
        selector: row => row.close_timestamp !== null ? dateFormat(row.close_timestamp, "UTC:dd/mmm/yyyy, hh:MM TT") : '-',
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown direction={'down'}>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <Can have={['PERIODS_EDIT']}>
                    <DropdownItem
                        onClick={_ => editToggleSidebar(row)}
                        className='w-100'
                    >
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                </Can>
                <Can have={['PERIODS_DELETE']}>
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
                </Can>
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
                    <Can have={['PERIODS_ADD']}>
                        <Button onClick={createToggleSidebar} siz={'sm'} color='primary'>Add New</Button>
                    </Can>
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