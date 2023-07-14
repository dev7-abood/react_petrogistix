import {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import {
    Card, CardBody,
    Form, FormGroup,
    Input, Row,
    Col, Label,
    CustomInput, Button,
    Nav, NavItem,
    NavLink, TabContent,
    TabPane
} from 'reactstrap'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {toast} from 'react-toastify'

const V3 = props => {

    const {userId} = props
    const {setIsUpdate} = props
    const {mainIsUpdated} = props

    const [data, setData] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [userName, setUserName] = useState('')
    const [questionLang, setQuestionLang] = useState('English')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/evaluation/get_all_q_v2/${userId}/`)
                setData(res.data.data.questions)
            } catch (err) {

            }
        })()
    }, [isUpdated])


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/user/get_user_info/?user_id=${userId}`)
                setUserName(`${res.data.data.first_name} ${res.data.data.last_name}`)
            } catch (err) {

            }
        })()
    }, [isUpdated])


    const SignupSchema = yup.object().shape({
        // 'answer.*': yup.required(),
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const labels = [{
        ar: "موافق بشدة", en: "Strongly agree"
    }, {
        ar: "موافق", en: "Agree"
    }, {
        ar: "محايد", en: "Neutral"
    }, {
        ar: "لا أوافق", en: "Disagree"
    }, {
        ar: "لا أريد الإجابة", en: "Declined to answer"
    }]

    const onSubmit = async c_data => {
        const data = []
        Object.keys(c_data).forEach(key => {
            data.push(
                {
                    question_id: key.split('_')[1],
                    group_id : key.split('_')[2],
                    user_to_id: userId,
                    value: c_data[key],
                    question_type: key.split('_')[3],
                }
            )
        })

        try {
            const res = await axios.post(`/evaluation/update_answers/`, data)
            toast.success('Answers is set ✔');
            setIsUpdated(!isUpdated)
            setIsUpdate(!mainIsUpdated)
        } catch (err) {
        }
    }

    return (<>
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p><strong>Employee Name: {userName}</strong></p>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                active={questionLang === 'English'}
                                onClick={_ => setQuestionLang('English')}
                            >
                                English
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={questionLang === 'Arabic'}
                                onClick={_ => setQuestionLang('Arabic')}
                            >
                                العربية
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {data.map((el, index) => {
                        return <Fragment key={index}>
                            <Row className='my-2'>
                                <Col lg={8}>
                                    <FormGroup key={index}>
                                        <Label for={`radio_${index}`}><strong>{questionLang === 'English' ? el.title : el.ar_title}</strong></Label>
                                        {el.question_type === 'multiple' ? <div style={{marginTop: '1.5px'}}>
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label={questionLang === 'English' ? labels[0].en : labels[0].ar}
                                                defaultChecked={el.answer.answer === '100'}
                                                defaultValue={'100'}
                                                disabled={!(el.status) || !(el.group.period !== null ? el.group.period.is_future : true)}
                                                name={`answer_${el.id}_${el.group.id}_multiple`}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label={questionLang === 'English' ? labels[1].en : labels[1].ar}
                                                defaultChecked={el.answer.answer === '75'}
                                                defaultValue={'75'}
                                                name={`answer_${el.id}_${el.group.id}_multiple`}
                                                disabled={!(el.status) || !(el.group.period !== null ? el.group.period.is_future : true)}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label={questionLang === 'English' ? labels[2].en : labels[2].ar}
                                                defaultChecked={el.answer.answer === '50'}
                                                defaultValue={'50'}
                                                name={`answer_${el.id}_${el.group.id}_multiple`}
                                                disabled={!(el.status) || !(el.group.period !== null ? el.group.period.is_future : true)}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label={questionLang === 'English' ? labels[3].en : labels[3].ar}
                                                defaultChecked={el.answer.answer === '25'}
                                                defaultValue={'25'}
                                                name={`answer_${el.id}_${el.group.id}_multiple`}
                                                disabled={!(el.status) || !(el.group.period !== null ? el.group.period.is_future : true)}
                                                innerRef={register({required: true})}

                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label={questionLang === 'English' ? labels[4].en : labels[4].ar}
                                                defaultChecked={el.answer.answer === '0'}
                                                defaultValue={'0'}
                                                name={`answer_${el.id}_${el.group.id}_multiple`}
                                                disabled={!(el.status) || !(el.group.period !== null ? el.group.period.is_future : true)}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                        </div> : <>
                                            <Input
                                                id={`Primary_${Math.random()}`}
                                                type='textarea'
                                                onChange={e => {
                                                    // document.getElementById(`number_of_words_countable_${el.id}`)
                                                    //     .innerText = `# of words: ${el.number_of_words !== null ? el.number_of_words : 30} of ${e.target.value.split(' ').length}`
                                                    const words = el.number_of_words !== null ? el.number_of_words : 30
                                                    if (e.target.value.split(' ').length >= words) {
                                                        e.target.maxLength = e.target.value.length
                                                    }
                                                }}
                                                defaultValue={el.answer.text_answer}
                                                name={`answer_${el.id}_${el.group.id}_textarea`}
                                                disabled={!(el.status) || !(el.group.period !== null ? el.group.period.is_future : true)}
                                                innerRef={register({required: true})}
                                            />
                                        </>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Fragment>
                    })}
                    {data.length !== 0 ? <FormGroup>
                        <Button color='primary'>{questionLang === 'English' ? "Save" : "حفظ"}</Button>
                    </FormGroup> : <strong className='d-inline-block my-1'>There are no questions to display at this time.</strong>}
                </Form>
            </CardBody>
        </Card>
    </>)
}

export default V3