import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'

const Home = () => {
    return (
        <div>
            <Breadcrumbs breadCrumbTitle='Dashboard' breadCrumbParent='Dashboard' breadCrumbActive='Dashboard'/>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Petrogistix ✔️</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Home
