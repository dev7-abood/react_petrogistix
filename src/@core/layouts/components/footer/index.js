// ** Icons Import
import { Heart } from 'react-feather'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
const Footer = () => {

  const updateLayout = useSelector(state => state.updateLayout)

  const [siteName, setSiteName] = useState('')

  useEffect(_ => {
      (async _ => {
         try {
            const res = await axios.get('/setting/get_setting_value/?name=site_name')
             setSiteName(res.data.data.value)
         } catch (err){
             console.log(err)
         }
      })()
  }, [updateLayout])

  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='#' target='_blank' rel='noopener noreferrer'>
          {siteName}
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Hand-crafted & Made with
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
