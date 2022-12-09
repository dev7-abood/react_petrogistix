import {useState, useEffect} from 'react'
import {isObjEmpty} from "@utils";
import {
    UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Card, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'


import {
    MoreVertical, Download, ChevronDown, Eye
} from 'react-feather'


import '../../table-style.css'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from 'react-data-table-component'

import {AiOutlineHtml5} from 'react-icons/ai';

import axios from 'axios'

import TopModal from "./modals-data/TopModal";
import TreatmentModal from "./modals-data/TreatmentModal";
import MudModal from "./modals-data/MudModal";

import env from '@src/env.json'

const DataTableServerSide = props => {
    // ** Store Vars

    const {collection_id} = props
    const {selectYear} = props
    const {search} = props
    const {collectionName} = props

    const [data, setData] = useState([])
    const [limit, setLimit] = useState('')
    const [page, setPage] = useState('')

    const [isOpenTopModal, setIsOpenTopModal] = useState(false)
    const [isOpenTreatmentModal, setIsOpenTreatmentModal] = useState(false)
    const [isOpenMudModal, setIsOpenMudModal] = useState(false)
    const [objectId, setObjectId] = useState('')

    useEffect(_ => {
        (async _ => {
            const res = await axios.get(`/data-exstr/html_file/show/${collection_id}?format=json${limit}${page}${selectYear}${search}`)
            setData(res.data)
        })()
    }, [limit, page, collection_id, selectYear, search])


    const columns = [{
        name: 'Well', selector: row => row.Well,
    }, {
        name: 'Rig', selector: row => row.Rig,
    }, {
        name: 'Date', selector: row => row.Date['$date'],
    }, {
        name: 'View file', selector: row => <a target='_blank' href={`${env.BACK_BASE_URL}${row.Path}`}><AiOutlineHtml5
            size={25}/></a>,
    }, {
        name: 'Data',
        minWidth: '110px',
        selector: '',
        sortable: true,
        cell: row => (<div className='column-action d-flex align-items-center'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='span'>
                        <MoreVertical size={17} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                            <div onClick={_ => {
                                setObjectId(row._id['$oid'])
                                setIsOpenMudModal(true)
                            }}>
                                <Eye size={14} className='mr-50'/>
                                <span className='align-middle'>Mud</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem  tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                            <div onClick={_ => {
                                setObjectId(row._id['$oid'])
                                setIsOpenTopModal(true)
                            }}>
                                <Eye size={14} className='mr-50'/>
                                <span className='align-middle'>Top</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                            <div onClick={_ => {
                                setObjectId(row._id['$oid'])
                                setIsOpenTreatmentModal(true)
                            }}>
                                <Eye size={14} className='mr-50'/>
                                <span className='align-middle'>Treatment</span>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>)
    }];


    // {JSON.stringify(treatments, null, 10)}

    const onChangePage = page => {
        setPage(`&page=${page}`)
    };

    const onChangeRowsPerPage = limit => {
        setLimit(`&limit=${limit}`)
    }

    return (<>
        {!isObjEmpty(data) ? <>
            <TopModal
                isOpen={isOpenTopModal}
                setIsOpen={setIsOpenTopModal}
                objectId={objectId}
            />

            <TreatmentModal
                isOpen={isOpenTreatmentModal}
                setIsOpen={setIsOpenTreatmentModal}
                objectId={objectId}
            />

            <MudModal
                isOpen={isOpenMudModal}
                setIsOpen={setIsOpenMudModal}
                objectId={objectId}
            />
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Collection name: {collectionName}</CardTitle>
                </CardHeader>
                <DataTable
                    noHeader
                    direction={'auto'}
                    className='react-dataTable'
                    columns={columns}
                    sortIcon={<ChevronDown size={10}/>}
                    // paginationComponent={CustomPagination}
                    data={data.data}
                    // selectableRows
                    pagination
                    paginationServer
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    paginationTotalRows={data.total}
                />
            </Card>
        </> : ''}
    </>)
}

export default DataTableServerSide
