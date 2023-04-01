import React, {useEffect, useRef, useState} from "react";
import ReactDOMServer from 'react-dom/server';
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
import NewInput from './NewInput'

import {isObjEmpty} from '@utils'
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'

const CreateV1 = props => {

    const {location} = props

    const [data, setData] = useState(location.state.data)
    const [groupId, setGroupId] = useState(null)
    const [isNew, setIsNew] = useState(true)
    const [idsDeleteRecord, setIdsDeleteRecord] = useState([])

    useEffect(_ => {
        setGroupId(data.id)
    }, [data, idsDeleteRecord])

    const [questions, setQuestions] = useState([])

    useEffect(_ => {
        if (groupId) {
            (async _ => {
                try {
                    const data = []
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

    const onAdd = _ => setNumberInputs(numberInputs + 1)

    const [numberInputs, setNumberInputs] = useState(0)


    const [questionType, setQuestionType] = useState('textarea')


    const SignupSchema = yup.object().shape({
        // 'title.*': yup.string().required()
    })

    const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        console.log(data)
        trigger()
        // if (isNew) {
        try {
            const res = await axios.post(`/question/create/${groupId}/`, {
                ...data, ids_delete_record: idsDeleteRecord
            })
            toast.success('Questions saved successfully')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Form Question' breadCrumbParent='Dashboard'
                         breadCrumbActive='Form Question'/>

            <Card>
                <CardHeader>
                    <Button onClick={onAdd} color='primary' title={'Add New Question'}>+</Button>
                </CardHeader>
                <CardBody>
                    <div>
                        <p><strong>Group Name</strong>: {data.name}</p>
                        <p><strong>Status</strong>: {data.status === 1 ? <span className='text-success'>Acctive</span> :
                            <span className='text-danger'>Disabled</span>}</p>
                    </div>
                    <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col lg={4}>
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
                            <Col lg={2} className={classnames('', {
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
                                        defaultValue={30}
                                        innerRef={register({required: true})}
                                        className={classnames({'is-invalid': errors['number_of_words[0]']})}
                                        defaultValue={!isNew ? questions[0].number_of_words : 30}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={2} className={classnames('', {
                                'd-none': questionType === 'textarea'
                            })}>
                                <FormGroup className='mb-2'>
                                    <Label for='right_answer'>Right answer</Label>
                                    <Input
                                        type='select'
                                        name='right_answer[0]'
                                        id='right_answer'
                                        innerRef={register({required: true})}
                                        className={classnames({'is-invalid': errors['right_answer[0]']})}
                                        defaultValue={!isNew ? questions[0].right_answer : ''}
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div>
                            {[...Array(numberInputs)].map((el, index) => {
                                return <div key={index}>
                                    <NewInput
                                        index={index + 1}
                                        numberOfInputs={numberInputs}
                                        register={register}
                                        errors={errors}
                                        setIdsDeleteRecord={setIdsDeleteRecord}
                                        idsDeleteRecord={idsDeleteRecord}
                                        row={{
                                            id: '',
                                            title: '',
                                            question_type: '',
                                            number_of_words: 30,
                                            right_answer: ''
                                        }}
                                    />
                                </div>
                            })}
                        </div>

                        <div>
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
                                            row={el}
                                        />
                                    </div>
                                }
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
        </>
    )
}

export default CreateV1