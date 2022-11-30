import dateFormat  from "dateformat"
import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import {
  Badge,
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
  ChevronDown
} from 'react-feather'

import '../../table-style.css'

import DataTable from 'react-data-table-component'

import axios from 'axios'

import env from '@src/env.json'

const DataTableServerSide = () => {
  // ** Store Vars

  // ** States
  const [searchValue, setSearchValue] = useState('')

  const [data, setData] = useState([])
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')

  useEffect(_ => {
    (async _ => {
        const res = await axios.get(`/data-exstr/collection/index/?format=json${limit}${page}${searchValue}`)
        setData(res.data)
    })()
  }, [limit, page, searchValue])

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
      name: 'Action',
      minWidth: '110px',
      selector: '',
      cell: row => (
          <div className='column-action d-flex align-items-center'>
            <Link to={`/html-files`} id={`pw-tooltip-${row.id}`}>
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
                  <a download href={`${env.BACK_BASE_URL}${row.collection_path}`}><span className='align-middle'>Download</span></a>
                </DropdownItem>
                <DropdownItem
                    tag='a'
                    href='/'
                    className='w-100'
                    onClick={e => {
                      e.preventDefault()
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
      <Card>
        <Row className='mx-0 mt-1 mb-50 my-3'>
          <Col sm='8'>
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
      </Card>
    </>
  )
}

export default memo(DataTableServerSide)
