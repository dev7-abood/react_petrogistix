// ** React Imports
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
    Slack,
    User,
    Settings,
    Database,
    Edit2,
    MoreVertical,
    FileText,
    Trash2,
    Archive,
    ChevronDown
} from 'react-feather'

import Avatar from '@components/avatar'

// ** Invoice List Sidebar
import CreateForm from "../form/CreateForm";
import EditForm from "../form/EditForm";

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
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

// ** Table Header
const CustomHeader = ({toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm}) => {

    return (
        <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <Label for='rows-per-page'>Show</Label>
                        <CustomInput
                            className='form-control mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{
                                width: '5rem',
                                padding: '0 0.8rem',
                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                            }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </CustomInput>
                        <Label for='rows-per-page'>Entries</Label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                        <Label className='mb-0' for='search-invoice'>
                            Search:
                        </Label>
                        <Input
                            id='search-invoice'
                            className='ml-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>
                    <Button.Ripple color='primary' onClick={toggleSidebar}>
                        Add New User
                    </Button.Ripple>
                </Col>
            </Row>
        </div>
    )
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
    const [currentRole, setCurrentRole] = useState({value: '', label: 'Select Role'})
    const [currentPlan, setCurrentPlan] = useState({value: '', label: 'Select Plan'})
    const [currentStatus, setCurrentStatus] = useState({value: '', label: 'Select Status', number: 0})

    // ** Function to toggle sidebar
    const createToggleSidebar = () => setCreateSidebarOpen(!createSidebarOpen)
    const editToggleSidebar = () => setEditSidebarOpen(!editSidebarOpen)

    // ** Get data on mount

    // ** User filter options


    // ** Function in get data on page change
    const handlePagination = page => {

    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {

    }

    // ** Function in get data on search query change
    const handleFilter = val => {

    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = 10

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
            />
        )
    }

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            role: currentRole.value,
            currentPlan: currentPlan.value,
            status: currentStatus.value,
            q: searchTerm
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

    }

    const [data, setData] = useState([])

    const columns = [
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'First Name',
            selector: row => row.first_name,
        },
        {
            name: 'Last Name',
            selector: row => row.last_name,
        },
        {
            name: 'Actions',
            minWidth: '100px',
            cell: row => (
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem
                            tag={Link}
                            to={`/apps/user/view/${row.id}`}
                            className='w-100'
                        >
                            <FileText size={14} className='mr-50'/>
                            <span className='align-middle'>Details</span>
                        </DropdownItem>
                        <DropdownItem

                            onClick={ _ => {
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
                        <DropdownItem className='w-100'>
                            <Trash2 size={14} className='mr-50'/>
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            )
        }
    ];

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/user/list/')
                setData(res.data.results)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Search Filter</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='4'>
                            {/*<Select*/}
                            {/*  isClearable={false}*/}
                            {/*  theme={selectThemeColors}*/}
                            {/*  className='react-select'*/}
                            {/*  classNamePrefix='select'*/}
                            {/*  // options={roleOptions}*/}
                            {/*  value={currentRole}*/}
                            {/*/>*/}
                        </Col>
                        <Col className='my-md-0 my-1' md='4'>
                            {/*<Select*/}
                            {/*  theme={selectThemeColors}*/}
                            {/*  isClearable={false}*/}
                            {/*  className='react-select'*/}
                            {/*  classNamePrefix='select'*/}
                            {/*  // options={planOptions}*/}
                            {/*  }}*/}
                            {/*/>*/}
                        </Col>
                        <Col md='4'>
                            {/*<Select*/}
                            {/*  theme={selectThemeColors}*/}
                            {/*  isClearable={false}*/}
                            {/*  className='react-select'*/}
                            {/*  classNamePrefix='select'*/}
                            {/*  // options={statusOptions}*/}
                            {/*/>*/}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <Alert className={'p-1'} color='warning'>Note: Username can't update check it before make it.</Alert>
                <DataTable
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={columns}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={data}
                    subHeaderComponent={
                        <CustomHeader
                            toggleSidebar={createToggleSidebar}
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />
            </Card>

            <EditForm data={editFormData} open={editSidebarOpen} toggleSidebar={editToggleSidebar} />
            <CreateForm open={createSidebarOpen} toggleSidebar={createToggleSidebar} />

        </>
    )
}

export default UsersList
