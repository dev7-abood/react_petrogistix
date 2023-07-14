import {Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import SubmitDatatable from "./SubmitDatatable"
import StatisticsDatatable from "./StatisticsDatatable"

import {useState} from 'react'
import Can from '@c/Can'

const Evaluation = props => {

    const [active, setActive] = useState('1')

    const toggle = tab => (active !== tab) ? setActive(tab) : ''

    return (<>
        <Breadcrumbs breadCrumbTitle='Evaluation' breadCrumbParent='Dashboard'
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
                        Questions section
                    </NavLink>
                </NavItem>
                <Can have={['QUESTIONSTATISTICS_READ']}>
                    <NavItem>
                        <NavLink
                            active={active === '2'}
                            onClick={() => {
                                toggle('2')
                            }}
                        >
                            Manager Statistics
                        </NavLink>
                    </NavItem>
                </Can>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='1'>
                    <Card>
                        <CardBody>
                            <SubmitDatatable/>
                        </CardBody>
                    </Card>
                </TabPane>
                <Can have={['QUESTIONSTATISTICS_READ']}>
                    <TabPane tabId='2'>
                        <Card>
                            <CardBody>
                                <StatisticsDatatable/>
                            </CardBody>
                        </Card>
                    </TabPane>
                </Can>
            </TabContent>
        </div>
    </>)
}

export default Evaluation