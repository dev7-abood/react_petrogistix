import DataTable from 'react-data-table-component';
import Breadcrumbs from '@components/breadcrumbs';

import {
    MoreVertical, Trash2, Archive
} from 'react-feather';

import {
    Card, CardBody, CardHeader, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import Create from "./Create";
import Edit from "./Edit";
import axios from 'axios'
import {useState, useEffect} from 'react';
import DeleteAlertModal from "@c/DeleteAlertModal";
import {useHistory} from "react-router-dom";

const Job = _ => {

    const history = useHistory()

    const [isUpdate, setIsUpdate] = useState(true)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteRout, setDeleteRout] = useState('')
    const toggle = () => setOpenDeleteModal(!openDeleteModal);

    const [data, setData] = useState([])
    const [editData, setEditData] = useState({})


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/group/list/')
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
        name: 'Group Name', selector: row => row.name,
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
                <DropdownItem
                    onClick={_ => editToggleSidebar(row)}
                    className='w-100'
                >
                    <Archive size={14} className='mr-50'/>
                    <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={_ => history.push("/create-questions", {data: row})}
                >
                    <Archive size={14} className='mr-50'/>
                    <span className='align-middle'>Questions</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={_ => {
                        toggle()
                        setDeleteRout(`/group/delete/${row.id}/`)
                    }}
                >
                    <Trash2 size={14} className='mr-50'/>
                    <span className='align-middle'>Delete</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>)
    }];

    return (<>
        <Breadcrumbs breadCrumbTitle='Question Groups' breadCrumbParent='Dashboard'
                     breadCrumbActive='Question Groups'/>
        <Card>
            <Create
                open={createSidebarOpen}
                toggleSidebar={createToggleSidebar}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
                job={data}
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
                job={data}
            />
            <CardBody>
                <CardHeader>
                    <p>Question Group Table</p>
                    <Button onClick={createToggleSidebar} color='primary'>Add New Group</Button>
                </CardHeader>
                <DataTable
                    noHeader
                    columns={columns}
                    data={data}
                />
            </CardBody>
        </Card>
    </>)
}

export default Job