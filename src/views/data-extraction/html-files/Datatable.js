import {useState, useEffect} from 'react'
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Card,
    CardHeader,
    CardTitle,
    Button
} from 'reactstrap'

import {
    MoreVertical,
    Download,
    ChevronDown
} from 'react-feather'

import '../../table-style.css'

import DataTable from 'react-data-table-component'
import Sidebar from "./Sidebar";

import {AiOutlineHtml5} from 'react-icons/ai';

import axios from 'axios'

const DataTableServerSide = props => {
    // ** Store Vars

    const {collection_id} = props

    const [data, setData] = useState([])

    const [openSidebar, setOpenSidebar] = useState(false)

    useEffect(_ => {
        (async _ => {
            const res = await axios.get(`/data-exstr/html_file/show/${collection_id}?format=json`)
            setData(res.data)
        })()
        console.log(collection_id)
    }, [collection_id])


    const columns = [
        {
            name: 'Well',
            selector: row => row.Well,
        },
        {
            name: 'Rig',
            selector: row => row.Rig,
        },
        {
            name: 'Date',
            selector: row => row.Date,
        },
        {
            name: 'View file',
            selector: row => <a target='_blank' href={'http://127.0.0.1:1171/088TE-QTIF-519.html'}><AiOutlineHtml5
                size={25}/></a>,
        },
        {
            name: 'Data',
            minWidth: '110px',
            selector: '',
            sortable: true,
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <UncontrolledDropdown>
                        <DropdownToggle tag='span'>
                            <MoreVertical size={17} className='cursor-pointer'/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                <Download size={14} className='mr-50'/>
                                <span className='align-middle'>Muds</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                <Download size={14} className='mr-50'/>
                                <span className='align-middle'>Tops</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                <Download size={14} className='mr-50'/>
                                <span className='align-middle'>Treatments</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    ];

    // const _data = [
    //     {
    //         'Well': 'QTIF-519',
    //         'Rig': '088TE',
    //         'Date': '5/10/2022',
    //         'Start Depth': [14011],
    //         'End Depth': [14011],
    //         'Formation': [['SULY', 'HITH', 'ARAB', 'ABAR', 'BAAR', 'ABBR', 'BABR', 'ABCR']],
    //         'Top Depth': [[6346, 6910, 7292, 7309, 7347, 7361, 7417, 7462]]
    //     },
    //     {
    //         'Well': 'QTIF-519',
    //         'Rig': '088TE',
    //         'Date': '5/10/2022',
    //         'Start Depth': [14011],
    //         'End Depth': [14011],
    //         'Formation': [['SULY', 'HITH', 'ARAB', 'ABAR', 'BAAR', 'ABBR', 'BABR', 'ABCR']],
    //         'Top Depth': [[6346, 6910, 7292, 7309, 7347, 7361, 7417, 7462]]
    //     },
    // ]


    // const muds = [{
    //     "Well": "QTIF-519",
    //     "Rig": "088TE",
    //     "Date": {
    //         "$date": {
    //             "$numberLong": "1664496000000"
    //         }
    //     },
    //     "Start Depth": ["14011"],
    //     "End Depth": ["14011"],
    //     "html_file_id": {
    //         "$oid": "636ec822d63c791ffe89cee0"
    //     },
    //     "Weight": [["88 PCF", "88 PCF"]],
    //     "Funnel Vis.": [["56 SEC", "58 SEC"]],
    //     "Filtrate(WL)": [["4 HTHP", "4 HTHP"]],
    //     "Filtrate (WL)": [["API", "API"]],
    //     "PV": [["25", "25"]],
    //     "YP": [["22", "24"]],
    //     "Electrical Stability": [["700 Volts", "710 Volts"]],
    //     "3/6 RPM": [["13 / 14", "13 / 14"]],
    //     "Gels Sec/Min": [["13 / 15", "13 / 15"]],
    //     "PH": [["0", "0"]],
    //     "CA PPM": [["0", "0"]],
    //     "CL PPM": [["0", "0"]],
    //     "FL Temp": [["0", "0"]],
    //     "Cake HTHP": [["0.5", "0.5"]],
    //     "Cake API": [["0", "0"]],
    //     "Water Vol. %": [["16", "16"]],
    //     "Oil Vol. %": [["58", "58"]],
    //     "Solids Vol. %": [["26", "26"]],
    //     "Sand Vol. %": [["0", "0"]],
    //     "% LGS": [["4.8", "4.8"]],
    //     "MBT": [["0", "0"]],
    //     "Mud type": [["INVER", "INVER"]],
    //     "Water Well #": [["QTIF-904", "QTIF-904"]]
    // }
    // ]

    // const treatments = {
    //     "Well": "QTIF-519",
    //     "Rig": "088TE",
    //     "Date": {
    //         "$date": {
    //             "$numberLong": "1664496000000"
    //         }
    //     },
    //     "Start Depth": ["14011"],
    //     "End Depth": ["14011"],
    //     "Chemicals": [[]],
    //     "Quantities": [[]],
    //     "Units": [[]],
    // }


    // const PreDisabled = () => {
    //     return (
    //         <>
    //             {/*return <div><pre>{JSON.stringify(data, null, 2) }</pre></div>;*/}
    //             <div className='my-4'>
    //                 <h4 className='text-center text-dark p-2'>Tops</h4>
    //                 <div className="table-responsive">
    //                     <table className="table">
    //                         <tbody>
    //                         <tr>
    //                             <th scope="col">Well</th>
    //                             <th scope="col">Ring</th>
    //                             <th scope="col">Date</th>
    //                             <th scope="col">Start Depth</th>
    //                             <th scope="col">End Depth</th>
    //                             <th scope="col">Formation</th>
    //                             <th scope="col">Top Depth</th>
    //                         </tr>
    //                         <tr>
    //                             <td>QTIF-519</td>
    //                             <td>088TE</td>
    //                             <td>2020/10/10</td>
    //                             <td>[14011]</td>
    //                             <td>[14011]</td>
    //                             <td>[[SULY, HITH, ARAB, ABAR, BAAR, ABBR, BABR, ABCR]]</td>
    //                             <td>[[6346, 6910, 7292, 7309, 7347, 7361, 7417, 7462]]</td>
    //                         </tr>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }

    // const PreDisabled = () => {
    //   return (
    //   <div>
    //     <h1 className='text-center my-1 bg-white'>Tops</h1>
    //      <pre className='px-2 bg-white'>
    //        {JSON.stringify(data, null, 10)}
    //      </pre>
    //     <h1 className='text-center my-1 bg-white'>Mouds</h1>
    //     <pre className='px-2 bg-white'>
    //        {JSON.stringify(muds, null, 10)}
    //      </pre>
    //     <h1 className='text-center my-1 bg-white'>Treatments</h1>
    //     <pre className='px-2 bg-white'>
    //        {JSON.stringify(treatments, null, 10)}
    //      </pre>
    //   </div>
    //   );
    // }

    return (
        <>
            <Sidebar open={openSidebar} toggleSidebar={_ => setOpenSidebar(!openSidebar)}/>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Collection name: DDR_2022.zip</CardTitle>
                    <div>
                        <Button color='primary'>Export data</Button>
                    </div>
                </CardHeader>
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    direction={'auto'}
                    className='react-dataTable'
                    columns={columns}
                    sortIcon={<ChevronDown size={10}/>}
                    // paginationComponent={CustomPagination}
                    data={data.data}
                    selectableRows
                    expandableRows
                    // expandableRowsComponent={<PreDisabled/>}
                />
            </Card>
        </>
    )
}

export default DataTableServerSide
