import {useState, useEffect} from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import V3 from "../V3";
import Statistics from "../statistics";
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import Can from '@c/Can'

const Tap = props => {

    const {user_id} = props.match.params

    const [active, setActive] = useState('1')
    const [isUpdated, setIsUpdate] = useState(false)
    const [userName, setUserName] = useState('')
    const [rating, setRating] = useState('')

    const toggle = tab => (active !== tab) ? setActive(tab) : ''

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/user/get_user_info/?user_id=${user_id}`)
                setUserName(`${res.data.data.first_name} ${res.data.data.last_name}`)
                setRating(res.data.data.rating)
            } catch (err) {

            }
        })()
    }, [isUpdated])

    return (<>
            <Breadcrumbs breadCrumbTitle='Evaluation section' breadCrumbParent='Dashboard'
                         breadCrumbActive='Evaluation'/>
            <div>
                <V3
                    userId={user_id}
                    setIsUpdate={setIsUpdate}
                    mainIsUpdated={isUpdated}
                />
            </div>
        </>)
}

export default Tap