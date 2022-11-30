import {useEffect, useState} from 'react'
import axios from 'axios'

import {
    Label, Input, Card, CardHeader, CardBody, Row, CardTitle, Col, Form, FormGroup, Button
} from 'reactstrap'

const CollectionForm = _ => {

    // useEffect(_ => {
    //     (async _ => {
    //         const res = await axios.get('/data-exstr/create/')
    //         console.log(res)
    //     })()
    // }, [])

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>Form Collection</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col lg='6' sm='6'>
                            <FormGroup>
                                <Label for='file'>Collection File<span className='text-danger'>*</span></Label>
                                <Input defaultValue={''} id='file' type='file'/>
                                <small>The File Type Is zip</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='6' sm='6'>
                            <FormGroup>
                                <Label for='note'>Note</Label>
                                <Input defaultValue={''} id='note' type='textarea'/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Button color='primary' outline={true}>Submit</Button>
                </Form>
            </CardBody>
        </Card>
    </>)
}

export default CollectionForm