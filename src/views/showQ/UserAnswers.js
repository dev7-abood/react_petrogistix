import {useEffect, useState} from 'react'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import {
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
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
    Alert
} from 'reactstrap';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'
import * as yup from 'yup'

const UserAnswers = props => {

    // group_id
    const {id} = props.match.params
    const [showQuestions, setShowQuestions] = useState([])

    const [isAnswered, setIsAnswered] = useState(false)
    const [showAnsweredData, setShowAnsweredData] = useState([])
    const [questionIds, setQuestionIds] = useState([])

    const SignupSchema = yup.object().shape({
        // site_name: yup.string().required(),
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/group/get_group_record/${id}/`)
                setIsAnswered(res.data.is_answered)
            } catch (err) {

            }
        })()
    }, [])


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.post(`/answer/get_answers/${id}/`, {
                    "question_ids": questionIds
                })
                setShowAnsweredData(res.data.data)
            } catch (err) {

            }
        })()
    }, [isAnswered, questionIds])

    useEffect(_ => {
        (async _ => {
            try {
                const ids = []
                const res = await axios.get(`/question/show_available_question/${id}/`)
                setShowQuestions(res.data.data)
                res.data.data.map(el => {
                    ids.push(el.id)
                })
                setQuestionIds(ids)
            } catch (err) {

            }
        })()
    }, [])

    const onSubmit = async data => {
        try {
            const res = await axios.post(`/answer/submit_answers/${id}/`, data)
            toast.success('Thank you for your answer')
            location.reload()
        } catch (err) {

        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='User Questions' breadCrumbParent='Dashboard'
                     breadCrumbActive='User Questions'/>
        <Card>
            <CardBody>
                <Row>
                    <Col lg={7}>
                        {isAnswered === false ? <Form onSubmit={handleSubmit(onSubmit)}>
                            {showQuestions.map((el, index) => {
                                return <FormGroup key={index}>
                                    <Input
                                        type='hidden'
                                        name={`question_id[${index}]`}
                                        defaultValue={el.id}
                                        innerRef={register({required: true})}
                                    />
                                    <Label id={el.id}><strong>{el.title}<span
                                        className='text-danger'>*</span></strong></Label>
                                    {el.question_type === 'multiple' ? <Input
                                        type='select'
                                        required
                                        name={`answer[${index}]`}
                                        innerRef={register({required: true})}
                                    >
                                        <option></option>
                                        <option value='1'>I agree</option>
                                        <option value='2'>Neutral</option>
                                        <option value='3'>Not agree</option>
                                        <option value='4'>Strongly Disagree</option>
                                        <option value='5'>Declined to answer</option>
                                    </Input> : <Input
                                        id={el.id}
                                        type='textarea'
                                        required
                                        name={`answer[${index}]`}
                                        innerRef={register({required: true})}
                                        // maxlength={el.number_of_words}
                                    />}
                                </FormGroup>
                            })}
                            <Button disabled={isAnswered} color='primary' type='submit'>Submit</Button>
                        </Form> : <Form>
                            {showAnsweredData.map((el, index) => {
                                return <FormGroup key={index}>
                                    <Label id={el.id}><strong>{el.question.title}<span
                                        className='text-danger'>*</span></strong></Label>
                                    {el.question.question_type === 'multiple' ? <Input
                                        type='select'
                                        disabled={true}
                                        defaultValue={el.answer}
                                    >
                                        <option></option>
                                        <option value='1'>I agree</option>
                                        <option value='2'>Neutral</option>
                                        <option value='3'>Not agree</option>
                                        <option value='4'>Strongly Disagree</option>
                                        <option value='5'>Declined to answer</option>
                                    </Input> : <Input
                                        id={el.id}
                                        type='textarea'
                                        required
                                        disabled={true}
                                        defaultValue={el.answer}
                                    />}
                                </FormGroup>
                            })}
                            <Button disabled={isAnswered} color='primary' type='submit'>Submit</Button>
                        </Form>}

                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}

export default UserAnswers