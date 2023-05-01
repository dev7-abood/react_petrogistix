import {
    Card,
    CardBody
} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import UserDatatable from "./UserDatatable"

const Evaluation = _ => {

    return (<>
        <Breadcrumbs breadCrumbTitle='Evaluation' breadCrumbParent='Dashboard'
                     breadCrumbActive='Evaluation'/>
        <Card>
            <CardBody>
                <UserDatatable/>
            </CardBody>
        </Card>
    </>)
}

export default Evaluation