import Tap from "./Tap";
import Breadcrumbs from '@components/breadcrumbs'
// import '@styles/react/libs/tables/react-dataTable-component.scss'

const DataExtraction = _ => {
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Collections' breadCrumbParent='Dashboard' breadCrumbActive='Collections'/>
            <Tap/>
        </>
    )
}

export default DataExtraction