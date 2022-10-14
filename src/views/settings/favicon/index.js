import { Card, CardHeader, CardTitle, CardBody, Input, Label, Row, Col, Button } from 'reactstrap'

import Breadcrumbs from '@components/breadcrumbs'
const Favicon = _ => {
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Favicon' breadCrumbParent='Settings' breadCrumbActive='Favicon' />
            <Card>
                <CardBody>
                    <Row>
                        <Col lg='4'>
                            <Input type='file' id='site-name' className='mb-1' />
                            <small>favicon 20x20</small>
                        </Col>
                        <Col className='d-flex justify-content-center' lg='4'>
                            <a href='https://i.pinimg.com/564x/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg'
                               download
                            >
                                <img width='50' className='' alt='' src='https://i.pinimg.com/564x/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg'/>
                            </a>
                        </Col>
                    </Row>
                    <Button color='primary my-1'>Update</Button>
                </CardBody>
            </Card>
        </>
    )
}

export default Favicon