import { useState, useEffect } from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import V3 from "../V3";
import Statistics from "../statistics";
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'

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

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Evaluation section' breadCrumbParent='Dashboard'
                         breadCrumbActive='Evaluation'/>
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            active={active === '1'}
                            onClick={() => {
                                toggle('1')
                            }}
                        >
                            Submit
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '2'}
                            onClick={() => {
                                toggle('2')
                            }}
                        >
                            Statistics
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='py-50' activeTab={active}>
                    <TabPane tabId='1'>
                        <V3
                            userId={user_id}
                        />
                    </TabPane>
                    <TabPane tabId='2'>
                        <Statistics
                            userName={userName}
                            userId={user_id}
                            rating={rating}
                        />
                    </TabPane>
                </TabContent>
            </div>
        </>
    )
}

export default Tap