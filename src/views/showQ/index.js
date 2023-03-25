import classnames from 'classnames'

import {
    Card, CardBody, CardHeader, Row, Col, Form, FormGroup, Label, Input, Button
} from 'reactstrap';

const ShowQ = _ => {
    return (<Card>
        <CardHeader>Questions View</CardHeader>
        <CardBody>
            <Row>
                <Col lg={6}>
                    <Form>
                        <FormGroup>
                            <Label for='department_name'>Q Title <span className='text-danger'>*</span></Label>
                            <Input
                                name='name'
                                id='name'
                                type='textarea'
                                placeholder=''
                                // innerRef={register({required: true})}
                                // className={classnames({'is-invalid': errors['name']})}
                            />
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label for='department'>Belong to a department</Label>
                            <Input type='select' id='department' name='department'>
                                <option value='basic'>Dep 1</option>
                                <option value='basic'>Dep 2</option>
                                <option value='basic'>Dep 3</option>
                                <option value='basic'>Dep 4</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='department_name'>Q Title <span className='text-danger'>*</span></Label>
                            <Input
                                name='name'
                                id='name'
                                type='textarea'
                                placeholder=''
                                // innerRef={register({required: true})}
                                // className={classnames({'is-invalid': errors['name']})}
                            />
                        </FormGroup>

                        <FormGroup className='mb-2'>
                            <Label for='department'>Belong to a department</Label>
                            <Input type='select' id='department' name='department'>
                                <option value='basic'>Dep 1</option>
                                <option value='basic'>Dep 2</option>
                                <option value='basic'>Dep 3</option>
                                <option value='basic'>Dep 4</option>
                            </Input>
                        </FormGroup>
                        <Button type='submit' className='mr-1' color='primary'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </CardBody>
    </Card>)
}

export default ShowQ