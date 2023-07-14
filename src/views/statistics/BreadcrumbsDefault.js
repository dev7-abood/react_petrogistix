import { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const BreadcrumbsDefault = () => {
    return (
        <Fragment>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/home'> Home </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/evaluation'> Evaluation </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span> Results </span>
                </BreadcrumbItem>
            </Breadcrumb>
        </Fragment>
    )
}
export default BreadcrumbsDefault
