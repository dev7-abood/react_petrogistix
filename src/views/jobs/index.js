import DataTable from 'react-data-table-component';
import Breadcrumbs from '@components/breadcrumbs';

import {
    MoreVertical, Trash2, Archive
} from 'react-feather';

import {
    Card, CardBody, CardHeader, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input
} from 'reactstrap';

import Create from "./Create";
import Edit from "./Edit";
import axios from 'axios'
import {useState, useEffect} from 'react';
import DeleteAlertModal from "@c/DeleteAlertModal";
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Can from '@c/Can'
const Job = _ => {

    const [isUpdate, setIsUpdate] = useState(true)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteRout, setDeleteRout] = useState('')
    const toggle = () => setOpenDeleteModal(!openDeleteModal);

    const [data, setData] = useState([])
    const [editData, setEditData] = useState({})

    const [departments, setDepartments] = useState([])
    const [rowLength, setRowLength] = useState(0)

    const [priorities, setPriorities] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const priorities = []
                const res = await axios.get('job/list/')
                const data = res.data.results
                setData(data)
                setRowLength(data.length)
                data.map(el => {
                    priorities.push(el.name)
                })
                setPriorities(priorities)

            } catch (err) {

            }
        })()
    }, [isUpdate])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('department/list/')
                setDepartments(res.data.results)
            } catch (err) {

            }
        })()
    }, [])

    const [createSidebarOpen, setCreateSidebarOpen] = useState(false)
    const [editSidebarOpen, setEditSidebarOpen] = useState(false)

    const createToggleSidebar = () => setCreateSidebarOpen(!createSidebarOpen)
    const editToggleSidebar = row => {
        setEditSidebarOpen(!editSidebarOpen)
        setEditData(row)
    }

    const onChangePriority = async (current_id, old_value, new_value) => {
        console.log(`current_id ${current_id}`, `Old value ${old_value}`, `New value ${new_value}`)
        try {
            const res = await axios.post('/job/sort_priorit/', {
                id: current_id, old_value, new_value
            })
            setIsUpdate(!isUpdate)
        } catch (err) {
            console.log(err)
        }
    }

    const columns = [{
        name: 'Job Name', selector: row => row.name,
    }, {
        name: 'Department', selector: row => row.department,
    }, {
        name: 'Status',
        selector: row => row.status === 1 ? <span className='text-success'>Active</span> :
            <span className='text-danger'>Disabled</span>,
    }, {
        name: 'Evaluation',
        selector: row => row.evaluation === 1 ? <span className='text-success'>Can</span> :
            <span className='text-danger'>Can't</span>,
    }, {
        name: 'Priority', selector: row => <Can have={['JOB_EDIT']}><Input onChange={e => onChangePriority(row.id, row.priority, e.target.value)}
                                                  defaultValue={row.priority} type='select'>
            {[...Array(rowLength)].map((el, index) => {
                if (index + 1 === row.priority) {
                    return <option value={row.priority} key={index}>{row.priority}</option>
                }
                return <option value={index + 1} key={index}>{index + 1}</option>
            })}
        </Input></Can>
    }, {
        name: 'Actions', minWidth: '100px', cell: row => (<UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <Can have={['JOB_EDIT']}>
                    <DropdownItem
                        onClick={_ => editToggleSidebar(row)}
                        className='w-100'
                    >
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                </Can>
                <Can have={['JOB_DELETE']}>
                    <DropdownItem
                        className='w-100'
                        onClick={_ => {
                            toggle()
                            setDeleteRout(`/job/delete/${row.id}/`)
                        }}
                    >
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </Can>
            </DropdownMenu>
        </UncontrolledDropdown>)
    }];

    return (<>
        <Breadcrumbs breadCrumbTitle='Jobs' breadCrumbParent='Dashboard'
                     breadCrumbActive='Jobs'/>
        <Card>
            <Create
                open={createSidebarOpen}
                toggleSidebar={createToggleSidebar}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
                job={data}
                departments={departments}
            />
            <Edit
                open={editSidebarOpen}
                toggleSidebar={editToggleSidebar}
                editData={editData}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
                departments={departments}
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
                    <p>Jobs Table</p>
                    <Can have={['JOB_ADD']}>
                        <Button onClick={createToggleSidebar} color='primary'>Add New Job</Button>
                    </Can>
                </CardHeader>
                <div className='d-flex'>
                    <p className='mx-1'><strong>Priorities: </strong></p>
                    {priorities.map((el, index) => {
                        return <p key={index}><strong>{el}</strong><span className='mx-1'>{rowLength !== index + 1 ? '>' : ''}</span></p>
                    })}
                </div>
                <DataTable
                    noHeader
                    className='react-dataTable'
                    columns={columns}
                    data={data}
                />
            </CardBody>
        </Card>
    </>)
}

export default Job