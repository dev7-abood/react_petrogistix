import Tap from "./Tap";
import Breadcrumbs from '@components/breadcrumbs'

const DataExtraction = _ => {
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Collections' breadCrumbParent='Dashboard' breadCrumbActive='Collections'/>
            <Tap/>
        </>
    )
}

export default DataExtraction