import dateFormat  from "dateformat"
import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
  Card,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'

import {
  Eye,
  MoreVertical,
  Download,
  Trash,
} from 'react-feather'

import '../../table-style.css'

import DataTable from 'react-data-table-component'

import axios from 'axios'

import env from '@src/env.json'
import { useSelector } from 'react-redux'
import DeleteAlertModal from "./DeleteAlertModal";
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const DataTableServerSide = () => {
  // ** Store Vars

  // ** States
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false)
  const [collectionId, setCollectionId] = useState(null)
  const [updateCollection, setUpdateCollection] = useState(false)

  const updateLayout = useSelector(state => state.updateLayout)

  const [searchValue, setSearchValue] = useState('')

  const [data, setData] = useState([])
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const [fileAccessKey, setFileAccessKey] = useState('')
  const [userId, setUserID] = useState('')


  useEffect(_ => {
    (async _ => {
        const res = await axios.get(`/data-exstr/collection/index/?format=json${limit}${page}${searchValue}`)
        setData(res.data)
    })()
  }, [limit, page, searchValue, updateLayout, updateCollection])


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

  const columns = [
    {
      name: 'Collection Name',
      selector: row => row.dir_name,
      sortable: true
    },
    {
      name: 'Upload at',
      selector: row => dateFormat(row.created_at['$date'], "dS mmm yyyy"),
      sortable: true
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true
    },
    {
      name: 'Exports',
      minWidth: '110px',
      selector: '',
      cell: row => (
          <div className='column-action d-flex align-items-center'>
            <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
              Related Files
            </UncontrolledTooltip>
            <UncontrolledDropdown>
              <DropdownToggle tag='span'>
                <MoreVertical size={17} className='cursor-pointer' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                    href={`${env.BACK_BASE_URL}/api_v1/export/treatments/${row._id['$oid']}`}
                    className='w-100'
                    target='_blank'
                    tag={'a'}
                >
                  <Download size={14} className='mr-50' />
                  <span className='align-middle'>Treatments</span>
                </DropdownItem>
                <DropdownItem
                    href={`${env.BACK_BASE_URL}/api_v1/export/muds/${row._id['$oid']}`}
                    className='w-100'
                    target='_blank'
                    tag={'a'}
                >
                  <Download size={14} className='mr-50' />
                  <span className='align-middle'>Muds</span>
                </DropdownItem>
                <DropdownItem
                    href={`${env.BACK_BASE_URL}/api_v1/export/tops/${row._id['$oid']}`}
                    className='w-100'
                    target='_blank'
                    tag={'a'}
                >
                  <Download size={14} className='mr-50' />
                  <span className='align-middle'>Tops</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
      )
    },
    {
      name: 'Action',
      minWidth: '110px',
      selector: '',
      cell: row => (
          <div className='column-action d-flex align-items-center'>
            <Link to={`/html-files/${row._id['$oid']}`} id={`pw-tooltip-${row.id}`}>
              <Eye size={17} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
              Related Files
            </UncontrolledTooltip>
            <UncontrolledDropdown>
              <DropdownToggle tag='span'>
                <MoreVertical size={17} className='cursor-pointer' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag='a' href='/' className='w-100'>
                  <Download size={14} className='mr-50' />
                  <a target='_blank' download href={`${env.BACK_BASE_URL}${`/api_v1/access-file/?access_id=access_key_${userId}&file_path=${row.collection_path}`}`}><span className='align-middle'>Download</span></a>
                </DropdownItem>
                <DropdownItem
                    tag='a'
                    href='/'
                    className='w-100'
                    onClick={e => {
                      e.preventDefault()
                      setOpenDeleteModal(true)
                      setCollectionId(row._id['$oid'])
                    }}
                >
                  <Trash size={14} className='mr-50' />
                  <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
      )
    }
  ];

  const onChangePage = page => {
    setPage(`&page=${page}`)
  };

  const onChangeRowsPerPage = limit => {
    setLimit(`&limit=${limit}`)
  }

  return (
    <>
      <DeleteAlertModal
          isOpenDeleteModal={isOpenDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          collectionId={collectionId}
          updateCollection={updateCollection}
          setUpdateCollection={setUpdateCollection}
      />
      {data.data ? <Card>
        <Row className='mx-0 mt-1 mb-50 my-3'>
          <Col sm='8'>
            FILES ACCESS KEY: {fileAccessKey}
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='4'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
                defaultValue={''}
                className='dataTable-filter'
                type='text'
                bsSize='sm'
                id='search-input'
                onChange={e => {
                  e.target.value !== '' ? setSearchValue(`&s=${e.target.value}`) : setSearchValue('')
                }}
            />
          </Col>
        </Row>
        <DataTable
            component="nav"
            noHeader
            className='react-dataTable'
            data={data.data}
            columns={columns}
            count={data.current_page}
            page={data.current_page}
            pagination
            paginationServer
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            paginationTotalRows={data.total}
        />
      </Card> : <Skeleton height='120px' count={2}/>}
    </>
  )
}

export default memo(DataTableServerSide)
