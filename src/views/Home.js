import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import {useEffect} from 'react'

const Home = () => {

    useEffect(_ => {
        if (localStorage.getItem('is_first_update') === "false") {
            localStorage.setItem('is_first_update', "true")
            location.reload()
        }
    }, [])

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
