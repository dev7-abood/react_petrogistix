import React, {useEffect, useState} from "react";
import {
    Card, CardBody, CardHeader, Input, Row, Col, Label, Button, Form, FormGroup
} from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs';
import NewInput from './NewInput'

import {isObjEmpty} from '@utils'
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'
import Select from 'react-select'
import DefaultSelectPermissions from "./DefaultSelectPermissions";
import SelectPermissions from "./SelectPermissions";

const Create = props => {

    const {location} = props

    const [labelAndValue, setLabelAndValue] = useState([])

    const [data, setData] = useState(location.state.data)
    const [groupId, setGroupId] = useState(null)
    const [isNew, setIsNew] = useState(true)
    const [idsDeleteRecord, setIdsDeleteRecord] = useState([])

    const [priorityNumbers, setPriorityNumbers] = useState([])

    const [removeIds, setRemoveIds] = useState([])

    useEffect(_ => {
        setGroupId(data.id)
    }, [data, idsDeleteRecord])

    const [questions, setQuestions] = useState([])


    const [permissionsCheckedToArray, setPermissionsCheckedToArray] = useState([])
    const [permissionsDefaultSelected, setPermissionsDefaultSelected] = useState([])

    useEffect(_ => {
        if (questions.length !== 0) {
            if (questions[0].permissions) {
                setPermissionsCheckedToArray(questions[0].permissions.split(','))
            }
        }
    }, [questions])

    useEffect(_ => {
        if (questions.length !== 0) {
            if (questions[0].permissions) {
                const data = []
                labelAndValue.map((el, index) => {
                    permissionsCheckedToArray.map((cEl) => {
                        if (el.value === cEl) {
                            data.push(index)
                        }
                    })
                })
                setPermissionsDefaultSelected(data)
            }
        }
    }, [permissionsCheckedToArray, questions])


    useEffect(_ => {
        if (groupId) {
            (async _ => {
                try {
                    const res = await axios.get(`/question/list/${groupId}/`)
                    setQuestions(res.data.data)
                    if (res.data.data.length !== 0) {
                        setIsNew(false)
                    }
                } catch (err) {

                }
            })()
        }
    }, [groupId, idsDeleteRecord])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/job/get_priorities/')
                setLabelAndValue(res.data.data.label_and_value)
                setPriorityNumbers(res.data.data.priority_numbers)
            } catch (err) {

            }
        })()
    }, [])

    const onAdd = _ => setNumberInputs(numberInputs + 1)

    const [numberInputs, setNumberInputs] = useState(0)


    const [questionType, setQuestionType] = useState('textarea')


    const SignupSchema = yup.object().shape({
        // 'title.*': yup.string().required()
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        try {
            const res = await axios.post(`/question/create/${groupId}/`, {
                ...data, ids_delete_record: removeIds
            })
            toast.success('Questions saved successfully')
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='Form Question' breadCrumbParent='Dashboard'
                     breadCrumbActive='Form Question'/>

        <Card>
            <CardHeader>
                <Button onClick={onAdd} color='primary' title={'Add New Question'}>+</Button>
            </CardHeader>
            <CardBody>
                <div>
                    <p><strong>Group Name</strong>: {data.name}</p>
                    <p><strong>Status</strong>: {data.status === 1 ? <span className='text-success'>Active</span> :
                        <span className='text-danger'>Disabled</span>}</p>
                </div>
                <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={3}>
                            <FormGroup>
                                <Input
                                    name={`id[0]`}
                                    id={`id_0`}
                                    innerRef={register({required: true})}
                                    type='hidden'
                                    defaultValue={!isNew ? questions[0].id : ''}
                                />
                                <Label for='title'>
                                    Title <span className='text-danger'>*</span>
                                </Label>
                                <Input
                                    required
                                    name='title[0]'
                                    id='title'
                                    placeholder='How about ...?'
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['title[0]']})}
                                    defaultValue={!isNew ? questions[0].title : ''}
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
                                    onChange={e => setQuestionType(e.target.value)}
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['question_type[0]']})}
                                    defaultValue={!isNew ? questions[0].question_type : ''}
                                >
                                    <option value='textarea'>Textarea</option>
                                    <option value='multiple'>Multiple Choice</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col lg={1} className={classnames('', {
                            'd-none': questionType === 'multiple'
                        })}>
                            <FormGroup>
                                <Label for='number_of_words'>
                                    # of words <span className='text-danger'>*</span>
                                </Label>
                                <Input
                                    type='number'
                                    name='number_of_words[0]'
                                    id='number_of_words'
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['number_of_words[0]']})}
                                    defaultValue={!isNew ? questions[0].number_of_words : 30}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={1}>
                            <FormGroup>
                                <Label for='weight'>
                                    Weight <span className='text-danger'>*</span>
                                </Label>
                                <Input
                                    type='number'
                                    name='weight[0]'
                                    required
                                    id='weight'
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['weight']})}
                                    defaultValue={!isNew ? parseInt(questions[0].weight) : 5}
                                    max={5}
                                    min={1}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for='permissions'>
                                    Permissions <span className='text-danger'>*</span>
                                </Label>
                                <div className='position-relative'>
                                    <Input
                                        id={'permissions[0]'}
                                        name={`permissions[0]`}
                                        innerRef={register({required: true})}
                                        tabIndex={-1}
                                        autoComplete="off"
                                        style={{opacity: 0, height: 0}}
                                        required={true}
                                        defaultValue={!isNew ? questions[0].permissions : ''}
                                    />
                                    <div className='position-absolute w-100' style={{top: 0}}>
                                        {!isNew ? <DefaultSelectPermissions
                                            labelAndValue={labelAndValue}
                                            index={0}
                                            permissionsDefaultSelected={permissionsDefaultSelected}
                                        /> : <SelectPermissions
                                            labelAndValue={labelAndValue}
                                            index={0}
                                        />}
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <div style={{zIndex: '10000 !important'}}>
                        {questions.map((el, index) => {
                            if (index !== 0) {
                                return <div key={index}>
                                    <NewInput
                                        index={index + numberInputs}
                                        numberOfInputs={questions.length}
                                        register={register}
                                        errors={errors}
                                        setIdsDeleteRecord={setIdsDeleteRecord}
                                        idsDeleteRecord={idsDeleteRecord}
                                        removeIds={removeIds}
                                        labelAndValue={labelAndValue}
                                        setRemoveIds={setRemoveIds}
                                        isNew={false}
                                        row={el}
                                        priorityNumbers={priorityNumbers}
                                    />
                                </div>
                            }
                        })}
                    </div>

                    <div style={{zIndex: '10000 !important'}}>
                        {[...Array(numberInputs)].map((el, index) => {
                            return <div key={index}>
                                <NewInput
                                    index={index + 1}
                                    numberOfInputs={numberInputs}
                                    register={register}
                                    errors={errors}
                                    setIdsDeleteRecord={setIdsDeleteRecord}
                                    idsDeleteRecord={idsDeleteRecord}
                                    removeIds={removeIds}
                                    setRemoveIds={setRemoveIds}
                                    labelAndValue={labelAndValue}
                                    priorityNumbers={priorityNumbers}
                                    isNew={true}
                                    row={{
                                        id: '',
                                        title: '',
                                        question_type: '',
                                        number_of_words: 30,
                                        right_answer: '',
                                        weight: 5,
                                        permissions: ''
                                    }}
                                />
                            </div>
                        })}
                    </div>

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

export default Create