import {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import {
    Card, CardBody, Form, FormGroup, Input, Row, Col, Label, CustomInput, Button
} from 'reactstrap'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {toast} from 'react-toastify'

const V3 = props => {

    const {userId} = props

    const [data, setData] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [userName, setUserName] = useState('')

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
        } catch (err) {
        }

    }

    return (<>
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p><strong>Employee Name: {userName}</strong></p>
                    {data.map((el, index) => {
                        return <Fragment key={index}>
                            <Row className='my-2'>
                                <Col lg={8}>
                                    <FormGroup key={index}>
                                        <Label for={`radio_${index}`}><strong>{el.title}</strong> {el.answer.answer === null ? (
                                            <small className='text-warning'>
                                                Not answered yet from user.
                                            </small>) : ''}</Label>
                                        {el.question_type === 'multiple' ? <div style={{marginTop: '1.5px'}}>
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='I agree'
                                                defaultChecked={el.answer.answer === '100'}
                                                defaultValue={'100'}
                                                disabled={el.status === 0}
                                                name={`answer_${el.id}_${el.group}_multiple`}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Neutral'
                                                defaultChecked={el.answer.answer === '75'}
                                                defaultValue={'75'}
                                                name={`answer_${el.id}_${el.group}_multiple`}
                                                disabled={el.status === 0}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Not agree'
                                                defaultChecked={el.answer.answer === '50'}
                                                defaultValue={'50'}
                                                name={`answer_${el.id}_${el.group}_multiple`}
                                                disabled={el.status === 0}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Strongly Disagree'
                                                defaultChecked={el.answer.answer === '25'}
                                                defaultValue={'25'}
                                                name={`answer_${el.id}_${el.group}_multiple`}
                                                disabled={el.status === 0}
                                                innerRef={register({required: true})}

                                                inline
                                            />
                                            <CustomInput
                                                type='radio'
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='Declined to answer'
                                                defaultChecked={el.answer.answer === '0'}
                                                defaultValue={'0'}
                                                name={`answer_${el.id}_${el.group}_multiple`}
                                                disabled={el.status === 0}
                                                innerRef={register({required: true})}
                                                inline
                                            />
                                        </div> : <Input
                                            id={`Primary_${Math.random()}`}
                                            type='textarea'
                                            required
                                            defaultValue={el.answer.answer}
                                            name={`answer_${el.id}_${el.group}_textarea`}
                                            disabled={el.status === 0}
                                            innerRef={register({required: true})}

                                        />}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Fragment>
                    })}
                    <FormGroup>
                        <Button color='primary'>Save</Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    </>)
}

export default V3