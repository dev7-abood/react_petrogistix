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
import {FaRegFilePowerpoint} from 'react-icons/fa';
import {BiDuplicate} from 'react-icons/bi';
import DuplicateModal from './DuplicateModal'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Job = _ => {

    const history = useHistory()

    const [isUpdate, setIsUpdate] = useState(true)
    const [openPeriodsModal, setOpenPeriodsModal] = useState(false)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteRout, setDeleteRout] = useState('')
    const toggle = () => setOpenDeleteModal(!openDeleteModal);

    const [data, setData] = useState([])
    const [editData, setEditData] = useState({})

    const [groupId, setGroupId] = useState(null)


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

    const [periods, setPeriods] = useState([])
    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/period/list/`)
                setPeriods(res.data.results)
            } catch (err) {

            }
        })()
    }, [isUpdate])

    const columns = [{
        name: 'Group Name', selector: row => row.name,
    }, {
        name: 'Period', selector: row => row.period !== null ? row.period : '-',
    }, {
        name: 'Subgroup Name', selector: row => row.sub_group !== null ? row.sub_group : '-',
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
                    className='w-100'
                    onClick={_ => history.push(`/group/permissions/${row.id}`, {row})}
                >
                    <FaRegFilePowerpoint size={14} className='mr-50'/>
                    <span className='align-middle'>Permissions</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={_ => history.push("/create/questions", {data: row})}
                >
                    <Archive size={14} className='mr-50'/>
                    <span className='align-middle'>Questions</span>
                </DropdownItem>

                <DropdownItem
                    className='w-100'
                    onClick={_ => {
                        setGroupId(row.id)
                        setOpenPeriodsModal(!openPeriodsModal)
                    }}
                >
                    <BiDuplicate size={14} className='mr-50'/>
                    <span className='align-middle'>Duplicate</span>
                </DropdownItem>

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
        <Breadcrumbs breadCrumbTitle='Question management' breadCrumbParent='Dashboard'
                     breadCrumbActive='Question management'/>
        <Card>
            <Create
                open={createSidebarOpen}
                toggleSidebar={createToggleSidebar}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
                job={data}
                periods={periods}
            />
            <Edit
                open={editSidebarOpen}
                toggleSidebar={editToggleSidebar}
                editData={editData}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
                periods={periods}
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

            <DuplicateModal
                setOpenPeriodsModal={_ => setOpenPeriodsModal(!openPeriodsModal)}
                openPeriodsModal={openPeriodsModal}
                groupId={groupId}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
            />

            <CardBody>
                <CardHeader>
                    <p><strong>Question management</strong></p>
                    <Button onClick={createToggleSidebar} color='primary'>Add New Group</Button>
                </CardHeader>
                <DataTable
                    className='py-4 react-dataTable'
                    noHeader
                    columns={columns}
                    data={data}
                />
            </CardBody>
        </Card>
    </>)
}

export default Job