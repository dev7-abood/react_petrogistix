import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    MoreVertical, FileText, Trash2, Archive
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
import Can from "@c/Can";

import './style.css'

// ** Table Header
const CustomHeader = ({toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm}) => {

    return (<div className='mx-2 mb-1'>
        <Row>
            <Col xl='6' className='d-flex align-items-center'>
                <Can have={['USER_ADD']}>
                    <Button.Ripple color='primary' onClick={toggleSidebar}>
                        Add New User
                    </Button.Ripple>
                </Can>
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
        name: 'Job', selector: row => row.job.job_name,
    }, {
        name: 'Departments', selector: row => <div title={row.departments.department_names}>{row.departments.department_names}</div>,
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <Can have={['USER_EDIT']}>
                    <DropdownItem
                        onClick={_ => {
                            location.href = `/user/permissions/${row.id}`
                        }}
                        className='w-100'
                    >
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Permissions</span>
                    </DropdownItem>
                </Can>
                <Can have={['USER_EDIT']}>
                    <DropdownItem
                        onClick={_ => {
                            setEditFormData(row)
                            editToggleSidebar()
                        }}
                        className='w-100'
                    >
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                </Can>
                <Can have={['USER_DELETE']}>
                    <DropdownItem className={'w-100'}
                                  onClick={_ => {
                                      setDeleteAlertModal(!deleteAlertModal)
                                      setDeleteRoute(`/user/delete/${row.id}/`)
                                  }}
                    >
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </Can>

            </DropdownMenu>
        </UncontrolledDropdown>)
    }];

    const [isUpdate, setIsUpdate] = useState(false)
    const [count, setCount] = useState(0)
    const [prevLink, setPrevLink] = useState('')
    const [nextLink, setNextLink] = useState('')
    const [link, setLink] = useState(`/user/list/?limit=10`)

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(link)
                setNextLink(res.data.next)
                setCount(res.data.count)
                setPrevLink(res.data.previous)
                setData(res.data.results)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [isUpdate, link, prevLink, nextLink])


    const CustomMaterialPagination = _ => {
        const previous = _ => setLink(prevLink)
        const next = _ => setLink(nextLink)

        return (<>
            <div className='d-flex justify-content-between mx-2 my-1'>
                <div>
                    Total records: <strong>{count}</strong>
                </div>
                <div className='d-flex justify-content-end align-items-center mx-2'>
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li onClick={previous} className="page-item user-select-none">
                                <button className="page-link">Previous</button>
                            </li>
                            <li onClick={next} className="page-item user-select-none">
                                <button className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
    }

    return (<>
        <Card>
            <DeleteAlertModal
                toggle={_ => setDeleteAlertModal(!deleteAlertModal)}
                openDeleteModal={deleteAlertModal}
                deleteRout={deleteRoute}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
            />
            <Alert className={'p-1 mb-1'} color='warning'>Note: Username can't update check it before make it.</Alert>
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
                count={count}
                paginationTotalRows={count}
                paginationComponent={CustomMaterialPagination}
            />
        </Card>
        <Can have={['USER_EDIT']}>
            <EditForm data={editFormData}
                      open={editSidebarOpen}
                      toggleSidebar={editToggleSidebar}/>
        </Can>
        <Can have={['USER_ADD']}>
            <CreateForm
                open={createSidebarOpen}
                toggleSidebar={createToggleSidebar}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
            />
        </Can>

    </>)
}

export default UsersList
