import {useState, useEffect} from 'react'
import {isObjEmpty} from "@utils";
import {
    UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Card, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'


import {
    MoreVertical, Download, ChevronDown, Eye
} from 'react-feather'


import '../../table-style.css'

import DataTable from 'react-data-table-component'

import {AiOutlineHtml5} from 'react-icons/ai';

import axios from 'axios'

import TopModal from "./modals-data/TopModal";

import env from '@src/env.json'

const DataTableServerSide = props => {
    // ** Store Vars

    const {collection_id} = props

    const [data, setData] = useState([])
    const [limit, setLimit] = useState('')
    const [page, setPage] = useState('')

    const [isOpenTopModal, setIsOpenTopModal] = useState(false)
    const [objectId, setObjectId] = useState('')

    useEffect(_ => {
        (async _ => {
            const res = await axios.get(`/data-exstr/html_file/show/${collection_id}?format=json${limit}${page}`)
            setData(res.data)
        })()
    }, [limit, page])


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
                            <Eye size={14} className='mr-50'/>
                            <span className='align-middle'>Mud</span>
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
                            <Eye size={14} className='mr-50'/>
                            <span className='align-middle'>Treatment</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>)
    }];


    // {JSON.stringify(treatments, null, 10)}
    const ShowData = data => {
        const [top, setTop] = useState([])
        const [mud, setMud] = useState([])
        const [treatment, setTreatment] = useState([])

        const [startDepth, setStartDepth] = useState('')
        const [endDepth, setEndDepth] = useState('')
        const [formation, setFormation] = useState('')
        const [topDepth, setTopDepth] = useState('')


        useEffect(_ => {
            (async _ => {
                try {
                    const res = await axios.get(`/data-exstr/show_top/${data.data._id['$oid']}/?format=json`)
                    setTop(res.data.data)
                    console.log('Rig------>', res.data.data)

                    const start_Depth =  res.data.data['Start Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                    setStartDepth(start_Depth)

                    const end_Depth =  res.data.data['End Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                    setEndDepth(end_Depth)

                    const formation =  res.data.data['Formation'].map((el, index) => {
                        return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span key={ix * 99999}>[{elx}],</span>)}],</span></div>
                    })
                    setFormation(formation)

                    const topDepth =  res.data.data['Top Depth'].map((el, index) => {
                        return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span key={ix * 99999}>[{elx}],</span>)}],</span></div>
                    })
                    setTopDepth(topDepth)

                    // console.log(res.data.data['Start Depth'].toString())
                    // res.data.data['Start Depth'].map((el, index) => {
                    //     return <div>
                    //         <p key={index}>{el}</p>
                    //     </div>
                    // })
                    // setStartDepth(res.data.data['Start Depth'].toString())
                    // setEndDepth(res.data.data['End Depth'].toString())
                } catch (err) {
                    // console.log(err)
                }
            })()
            // (async _ => {
            //     try {
            //
            //     }catch (err){}
            // })()
            // (async _ => {
            //     try {
            //
            //     }catch (err){}
            // })()
        }, [])

        return <>
            <div className='mb-4'>
                <p className='font-weight-bold p-2'>Top</p>
                {/*<div className="table-responsive">*/}
                {/*    <table className="table">*/}
                {/*        <tbody>*/}
                {/*        <tr>*/}
                {/*            <th scope="col">Well</th>*/}
                {/*            <th scope="col">Rig</th>*/}
                {/*            <th scope="col">Date</th>*/}
                {/*        </tr>*/}
                {/*        /!*{!isObjEmpty(top) ?*!/*/}
                {/*        <tr>*/}
                {/*            <td>{top.Well}</td>*/}
                {/*            <td>{top.Rig}</td>*/}
                {/*            <td>{'xxx'}</td>*/}
                {/*        </tr>*/}
                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*</div>*/}

                <div className='mt-2'>
                    <p className='text-center font-weight-bold p-2'>Start Depth</p>
                    <div className='px-5'>
                        <p className='text-justify'>{startDepth}</p>
                    </div>
                    <hr/>
                    <p className='text-center font-weight-bold p-2'>End Depth</p>
                    <div className='px-5'>
                        <p className='text-justify'>{endDepth}</p>
                    </div>
                    <hr/>
                    <p className='text-center font-weight-bold p-2'>Formation</p>
                    <div className='px-5'>
                        {formation}
                    </div>
                    <p className='text-center font-weight-bold p-2'>Top Depth</p>
                    <div className='px-5'>
                        {topDepth}
                    </div>

                </div>

            </div>
        </>
    }

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
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Collection name: DDR_2022.zip</CardTitle>
                    <div>
                        <Button color='primary'>Export data</Button>
                    </div>
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
                    expandableRows
                    pagination
                    paginationServer
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    paginationTotalRows={data.total}
                    expandableRowsComponent={<ShowData/>}
                />
            </Card>
        </> : ''}
    </>)
}

export default DataTableServerSide
