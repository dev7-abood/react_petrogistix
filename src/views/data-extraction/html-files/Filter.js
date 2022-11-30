import {Label, Input, Card, CardHeader, CardBody, Row, CardTitle, Col} from 'reactstrap'

const Filter = _ => {
    return (
        <>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Search Filter</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md='4'>
                                <Label for='user-role'>Collections</Label>
                                <Input defaultValue={''} type='select' id='user-role' name='user-role'>
                                    <option value='subscriber'>All</option>
                                    <option value='editor'>DDR_2022.zip</option>
                                </Input>
                            </Col>
                            <Col className='my-md-0 my-1' md='4'>
                                <Label for='user-role'>Date</Label>
                                <Input defaultValue={''} type='select' id='user-role' name='user-role'>
                                    <option value='2022'>All</option>
                                    <option value='2022'>2022</option>
                                    <option value='2021'>2021</option>
                                    <option value='2020'>2020</option>
                                    <option value='2019'>2019</option>
                                    <option value='2018'>2018</option>
                                </Input>
                            </Col>
                            <Col md='4'>
                                <Label for='user-role'>User Role</Label>
                                <Input defaultValue={''} type='select' id='user-role' name='user-role'>
                                    <option value='subscriber'>Subscriber</option>
                                    <option value='editor'>Editor</option>
                                    <option value='maintainer'>Maintainer</option>
                                    <option value='author'>Author</option>
                                    <option value='admin'>Admin</option>
                                </Input>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Filter