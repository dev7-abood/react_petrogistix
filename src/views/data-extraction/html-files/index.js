// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

import Filter from "./Filter";

// ** Tables
import Datatable from './Datatable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const HtmlFiles = () => {
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Data' breadCrumbParent='Home' breadCrumbActive='Data'/>
            <div>
                <Filter/>
            </div>
            <div>
                <Datatable/>
            </div>
        </>
    )
}

export default HtmlFiles
