// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

import Filter from "./Filter";

// ** Tables
import Datatable from './Datatable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useParams } from "react-router-dom";

const HtmlFiles = () => {
    const { id } = useParams();
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Data' breadCrumbParent='Home' breadCrumbActive='Data'/>
            <div>
                <Filter/>
            </div>
            <div>
                <Datatable collection_id={id}/>
            </div>
        </>
    )
}

export default HtmlFiles
