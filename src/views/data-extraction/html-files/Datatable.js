import {useState, useEffect} from 'react'
import {isObjEmpty} from "@utils";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Card
} from 'reactstrap'


import {
    MoreVertical, Download, ChevronDown, Eye
} from 'react-feather'


import '../../table-style.css'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from 'react-data-table-component'

import {AiOutlineHtml5} from 'react-icons/ai';

import axios from 'axios'

import ShowModal from "./modals-data/ShowModal";

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

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [objectId, setObjectId] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [urlParameter, setUrlParameter] = useState('')

    useEffect(_ => {
        (async _ => {
            const res = await axios.get(`/data-exstr/html_file/show/${collection_id}?format=json${limit}${page}${selectYear}${search}`)
            setData(res.data)
        })()
    }, [limit, page, collection_id, selectYear, search])


    const [fileAccessKey, setFileAccessKey] = useState('')
    const [userId, setUserID] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/generate_access_file_key/')
                setFileAccessKey(res.data.data.access_key)
                setUserID(res.data.data.user_id)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])


    const columns = [{
        name: 'Well', selector: row => row.Well,
    }, {
        name: 'Rig', selector: row => row.Rig,
    }, {
        name: 'Date', selector: row => row.Date['$date'],
    }, {
        name: 'View file', selector: row => <a target='_blank' href={`${env.BACK_BASE_URL}${`/api_v1/access-file/?access_id=access_key_${userId}&file_path=${row.Path.replace(env.DESKTOP_PATH, '')}`}`}><AiOutlineHtml5
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
                            setIsOpenModal(true)

                            setModalTitle('Mod Data')
                            setUrlParameter('show_mud')
                        }}>
                            <Eye size={14} className='mr-50'/>
                            <span className='align-middle'>Mud</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                        <div onClick={_ => {
                            setObjectId(row._id['$oid'])
                            setIsOpenModal(true)

                            setModalTitle('Top Data')
                            setUrlParameter('show_top')
                        }}>
                            <Eye size={14} className='mr-50'/>
                            <span className='align-middle'>Top</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                        <div onClick={_ => {
                            setObjectId(row._id['$oid'])
                            setIsOpenModal(true)

                            setModalTitle('Treatment Data')
                            setUrlParameter('show_treatment')
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

            <ShowModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                objectId={objectId}
                modalTitle={modalTitle}
                urlParameter={urlParameter}
            />

            <Card>
                <div className='p-1'>
                    <br/>
                    <p>FILES ACCESS KEY: {fileAccessKey}</p>
                    <p>Collection name: {collectionName}</p>
                </div>
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
