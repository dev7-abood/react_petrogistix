import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    MoreVertical, FileText, Trash2, Archive, ChevronDown
} from 'react-feather'


// ** Invoice List Sidebar
import CreateForm from "../form/CreateForm";
import EditForm from "../form/EditForm";

// ** Third Party Components
import DataTable from 'react-data-table-component'

import {
    Card,
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
} from 'reactstrap'
import axios from 'axios'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import DeleteAlertModal from "@c/DeleteAlertModal";

// ** Table Header
const CustomHeader = ({toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm}) => {

    return (<div className='mx-2 mb-1'>
            <Row>
                <Col xl='6' className='d-flex align-items-center'>
                    <Button.Ripple color='primary' onClick={toggleSidebar}>
                        Add New User
                    </Button.Ripple>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-start justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column'
                >
                </Col>
            </Row>
        </div>)
}

const UsersList = () => {
    // ** Store Vars

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [createSidebarOpen, setCreateSidebarOpen] = useState(false)
    const [editSidebarOpen, setEditSidebarOpen] = useState(false)
    const [editFormData, setEditFormData] = useState([])

    const [deleteAlertModal, setDeleteAlertModal] = useState(false)
    const [deleteRoute, setDeleteRoute] = useState('')

    // ** Function to toggle sidebar
    const createToggleSidebar = () => setCreateSidebarOpen(!createSidebarOpen)
    const editToggleSidebar = () => setEditSidebarOpen(!editSidebarOpen)

    const [data, setData] = useState([])

    const columns = [{
        name: 'Email', selector: row => row.email,
    }, {
        name: 'First Name', selector: row => row.first_name,
    }, {
        name: 'Last Name', selector: row => row.last_name,
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown>
                <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer'/>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem
                        tag={Link}
                        to={`/user/permissions/${row.id}`}
                        className='w-100'
                    >
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Permissions</span>
                    </DropdownItem>
                    <DropdownItem

                        onClick={_ => {
                            setEditFormData(row)
                            editToggleSidebar()
                        }}
                        // tag={Link}
                        // to={`/apps/user/edit/${row.id}`}
                        className='w-100'
                    >
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'
                                  onClick={_ => {
                                      setDeleteAlertModal(!deleteAlertModal)
                                      setDeleteRoute(`/user/delete/${row.id}/`)
                                  }}
                    >
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>)
    }];

    const [offset, setOffset] = useState(1)
    const [limit, setLimit] = useState(10)

    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/user/list/?limit=${limit}&offset=${offset}`)
                setData(res.data.results)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [offset, limit, isUpdate])

    const onChangePage = page => setOffset(page)

    const onChangeRowsPerPage = rows => setLimit(rows)

    return (<>
            <Card>
                <DeleteAlertModal
                    toggle={_ => setDeleteAlertModal(!deleteAlertModal)}
                    openDeleteModal={deleteAlertModal}
                    deleteRout={deleteRoute}
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                />
                <Alert className={'p-1'} color='warning'>Note: Username can't update check it before make it.</Alert>
                <CustomHeader
                    toggleSidebar={createToggleSidebar}
                    rowsPerPage={rowsPerPage}
                    searchTerm={searchTerm}
                />
                <DataTable
                    noHeader
                    pagination
                    responsive
                    paginationServer
                    columns={columns}
                    className='react-dataTable'
                    data={data}
                    count={data.count}
                    page={data.count}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    paginationTotalRows={data.total}
                />
            </Card>

            <EditForm data={editFormData} open={editSidebarOpen} toggleSidebar={editToggleSidebar}/>
            <CreateForm
                open={createSidebarOpen}
                toggleSidebar={createToggleSidebar}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
            />

        </>)
}

export default UsersList
