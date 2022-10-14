import { Card, CardHeader, CardTitle, CardBody, Input, Label, Row, Col, Button } from 'reactstrap'

import Breadcrumbs from '@components/breadcrumbs'
const SiteName = _ => {
    return (
        <>
            <Breadcrumbs breadCrumbTitle='Site name' breadCrumbParent='Settings' breadCrumbActive='Site name' />
            <Card>
                <CardBody>
                    <Row>
                        <Col lg='6'>
                            <Label for='site-name'>Site name</Label>
                            <Input id='site-name' className='mb-1' />
                            <Button color='primary'>Save</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default SiteName