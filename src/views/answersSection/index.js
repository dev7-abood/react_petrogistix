import React, {useEffect, useRef, useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Row,
    Col,
    Label,
    CustomInput,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Alert,
    Form,
    FormGroup
} from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs';

import {isObjEmpty} from '@utils'
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'


const AnswersSection = _ => {
    return (<>
            <Breadcrumbs breadCrumbTitle='Form Question' breadCrumbParent='Dashboard'
                         breadCrumbActive='Form Question'/>

            <Card>
                <CardBody>
                    <Form action='/' className='auth-register-form mt-2'>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for='title'>
                                        Title <span className='text-danger'>*</span>
                                    </Label>
                                    <Input
                                        required
                                        type='textarea'
                                        name='title[0]'
                                        id='title'
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={2}>
                                <FormGroup className='mb-2'>
                                    <Label for='status'>Question Type</Label>
                                    <Input
                                        type='select'
                                        name='question_type[0]'
                                        id='question_type'
                                    >
                                        <option value='textarea'>Textarea</option>
                                        <option value='multiple'>Multiple Choice</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg={2}>
                                <FormGroup>
                                    <Label for='number_of_words'>
                                        # of words <span className='text-danger'>*</span>
                                    </Label>
                                    <Input
                                        type='number'
                                        name='number_of_words[0]'
                                        id='number_of_words'
                                        defaultValue={30}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={2}>
                                <FormGroup className='mb-2'>
                                    <Label for='right_answer'>Right answer</Label>
                                    <Input
                                        type='select'
                                        name='right_answer[0]'
                                        id='right_answer'
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr/>
                        <div className='mr-1 mt-1'>
                            <Button type='submit' className='mr-1' color='primary'>
                                Save
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </>)
}

export default AnswersSection