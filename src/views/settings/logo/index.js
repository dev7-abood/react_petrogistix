import { Card, CardHeader, CardTitle, CardBody, Input, Label, Row, Col, Button } from 'reactstrap'

import Breadcrumbs from '@components/breadcrumbs'
const Logo = _ => {
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Logo' breadCrumbParent='Settings' breadCrumbActive='Logo' />
            <Card>
                <CardBody>
                    <Row>
                        <Col lg='4'>
                            <Input type='file' id='site-name' className='mb-1' />
                            <small>Big logo 500x500</small>
                        </Col>
                        <Col className='d-flex justify-content-center' lg='4'>
                            <a href='https://i.pinimg.com/564x/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg'
                               download
                            >
                                <img width='250' className='img-fluid img-thumbnail' alt='' src='https://i.pinimg.com/564x/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg'/>
                            </a>
                        </Col>
                    </Row>
                    <Row className='my-1'>
                        <Col lg='4'>
                            <Input type='file' id='site-name' className='mb-1' />
                            <small>Small logo 250x250</small>
                        </Col>
                        <Col className='d-flex justify-content-center' lg='4'>
                            <a href='https://i.pinimg.com/564x/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg'
                               download
                            >
                                <img width='250' className='img-fluid img-thumbnail' alt='' src='https://i.pinimg.com/564x/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg'/>
                            </a>
                        </Col>
                    </Row>
                    <Button color='primary'>Update</Button>
                </CardBody>
            </Card>
        </>
    )
}

export default Logo