import { useEffect, useState } from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import Datatable from "./collections/Datatable";
// import FormCollection from "./collections/CollectionForm";

const TabsBasic = _ => {

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }}
                    >
                        Collections
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '2'}
                        onClick={() => {
                            toggle('2')
                        }}
                    >
                        Upload Collection
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='1'>
                    <Datatable/>
                </TabPane>
                <TabPane tabId='2'>
                    {/*<FormCollection/>*/}
                </TabPane>
            </TabContent>
        </>
    )
}
export default TabsBasic
