// ** React Imports
import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'

// ** Third Party Components
import {Disc, X, Circle} from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'
import axios from 'axios'
import env from "@src/env.json"
import {useSelector, useDispatch} from 'react-redux'

const VerticalMenuHeader = props => {

    const dispatch = useDispatch()
    const updateLayout = useSelector(state => state.updateLayout)

    // ** Props
    const {menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover} = props

    // ** Reset open group
    useEffect(() => {
        if (!menuHover && menuCollapsed) setGroupOpen([])
    }, [menuHover, menuCollapsed])


    const [bigLogo, setBigLogo] = useState('')
    const [smallLogo, setSmallLogo] = useState('')


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/setting/get_setting_value/?name=big_logo')
                setBigLogo(`${env.BACK_BASE_URL}${res.data.data.value}`)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [updateLayout])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/setting/get_setting_value/?name=small_logo')
                setSmallLogo(`${env.BACK_BASE_URL}${res.data.data.value}`)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [updateLayout])

    // ** Menu toggler component
    const Toggler = () => {
        if (!menuCollapsed) {
            return (<Disc
                    size={20}
                    data-tour='toggle-icon'
                    className='text-primary toggle-icon d-none d-xl-block'
                    onClick={() => setMenuCollapsed(true)}
                />)
        } else {
            return (<Circle
                    size={20}
                    data-tour='toggle-icon'
                    className='text-primary toggle-icon d-none d-xl-block'
                    onClick={() => setMenuCollapsed(false)}
                />)
        }
    }

    return (<div className='navbar-header mb-1'>
            <ul className='nav navbar-nav flex-row'>
                <li className='nav-item mr-auto'>
                    <NavLink to='/' className='navbar-brand'>
            <span className=''>
              <img width='150' src={!menuCollapsed ? bigLogo : smallLogo} alt='logo'/>
            </span>
                    </NavLink>
                </li>
                <li className='nav-item nav-toggle'>
                    <div className='nav-link modern-nav-toggle cursor-pointer'>
                        <Toggler/>
                        <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none'
                           size={20}/>
                    </div>
                </li>
            </ul>
        </div>)
}

export default VerticalMenuHeader
