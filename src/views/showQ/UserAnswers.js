import {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
    Label,
    CustomInput,
    Button
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
    const [isActive, setIsActive] = useState(true)

    const SignupSchema = yup.object().shape({
        // 'answer.*': yup.required(),
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/group/get_group_record/${id}/`)
                setIsAnswered(res.data.is_answered)
                setIsActive(res.data.data.status !== 1)
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
        console.log(data)
        try {
            const res = await axios.post(`/answer/submit_answers/${id}/`, data)
            toast.success('Thank you for your answer')
            // location.reload()
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
                                    {el.question_type === 'multiple' ?
                                        <div style={{marginTop: '1.5px'}}>
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='I agree'
                                                defaultChecked
                                                defaultValue={'1'}
                                                innerRef={register({required: true})}
                                                name={`answer[${index}]`}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Neutral'
                                                defaultValue={'2'}
                                                innerRef={register({required: true})}
                                                name={`answer[${index}]`}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Not agree'
                                                defaultValue={'3'}
                                                innerRef={register({required: true})}
                                                name={`answer[${index}]`}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Strongly Disagree'
                                                defaultValue={'4'}
                                                innerRef={register({required: true})}
                                                name={`answer[${index}]`}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Declined to answer'
                                                defaultValue={'5'}
                                                innerRef={register({required: true})}
                                                name={`answer[${index}]`}
                                                inline
                                            />
                                        </div> : <Input
                                        id={el.id}
                                        type='textarea'
                                        required
                                        name={`answer[${index}]`}
                                        innerRef={register({required: true})}
                                        disabled={isActive}
                                        // maxlength={el.number_of_words}
                                    />}
                                </FormGroup>
                            })}
                            <FormGroup>
                                <hr/>
                            </FormGroup>
                            <FormGroup>
                                <Button disabled={isActive} color='primary' type='submit'>Submit</Button>
                            </FormGroup>
                        </Form> : <Form onSubmit={handleSubmit(onSubmit)}>
                            {showAnsweredData.map((el, index) => {
                                return <Fragment key={index}>
                                    <Input
                                        type='hidden'
                                        name={`question_id[${index}]`}
                                        defaultValue={el.question.id}
                                        innerRef={register({required: true})}
                                    />
                                    <FormGroup key={index}>
                                        <Label id={el.id}><strong>{el.question.title}<span
                                            className='text-danger'>*</span></strong></Label>
                                        {el.question.question_type === 'multiple' ?
                                            <div style={{marginTop: '1.5px'}}>
                                                <CustomInput
                                                    type='radio'
                                                    className='custom-control-Primary'
                                                    id={`Primary_${Math.random()}`}
                                                    label='I agree'
                                                    defaultChecked={el.answer === '1'}
                                                    defaultValue={'1'}
                                                    innerRef={register({required: true})}
                                                    disabled={isActive}
                                                    name={`answer[${index}]`}
                                                    inline
                                                />
                                                <CustomInput
                                                    type='radio'
                                                    className='custom-control-Primary'
                                                    id={`Primary_${Math.random()}`}
                                                    label='Neutral'
                                                    defaultChecked={el.answer === '2'}
                                                    defaultValue={'2'}
                                                    innerRef={register({required: true})}
                                                    disabled={isActive}
                                                    name={`answer[${index}]`}
                                                    inline
                                                />
                                                <CustomInput
                                                    type='radio'
                                                    className='custom-control-Primary'
                                                    id={`Primary_${Math.random()}`}
                                                    label='Not agree'
                                                    defaultChecked={el.answer === '3'}
                                                    defaultValue={'3'}
                                                    innerRef={register({required: true})}
                                                    disabled={isActive}
                                                    name={`answer[${index}]`}
                                                    inline
                                                />
                                                <CustomInput
                                                    type='radio'
                                                    className='custom-control-Primary'
                                                    id={`Primary_${Math.random()}`}
                                                    label='Strongly Disagree'
                                                    defaultChecked={el.answer === '4'}
                                                    defaultValue={'4'}
                                                    innerRef={register({required: true})}
                                                    disabled={isActive}
                                                    name={`answer[${index}]`}
                                                    inline
                                                />
                                                <CustomInput
                                                    type='radio'
                                                    className='custom-control-Primary'
                                                    id={`Primary_${Math.random()}`}
                                                    label='Declined to answer'
                                                    defaultChecked={el.answer === '5'}
                                                    defaultValue={'5'}
                                                    innerRef={register({required: true})}
                                                    disabled={isActive}
                                                    name={`answer[${index}]`}
                                                    inline
                                                />
                                            </div>
                                         : <Input
                                            id={el.id}
                                            type='textarea'
                                            required
                                            defaultValue={el.answer}
                                            disabled={isActive}
                                            innerRef={register({required: true})}
                                            name={`answer[${index}]`}
                                        />}
                                    </FormGroup>
                                </Fragment>
                            })}
                            <FormGroup>
                                <br/>
                            </FormGroup>
                            <FormGroup>
                                <Button outline disabled={isActive} color='primary' type='submit'>Save</Button>
                            </FormGroup>
                        </Form>}

                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}

export default UserAnswers