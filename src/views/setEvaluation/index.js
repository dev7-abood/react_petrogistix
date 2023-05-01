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
    CustomInput
} from 'reactstrap';

const SetEvaluation = props => {

    // group_id
    const {id} = props.match.params
    const {user_id} = props.match.params
    const {group_name} = props.match.params

    const [showQuestions, setShowQuestions] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [userName, setUserName] = useState('')

    const [isAnswered, setIsAnswered] = useState(false)
    const [showAnsweredData, setShowAnsweredData] = useState([])
    const [questionIds, setQuestionIds] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [groupRating, setGroupRating] = useState(0)

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/group/get_group_record/${id}/`)
                setIsAnswered(res.data.is_answered)
                setGroupRating(res.data.data.rating)
            } catch (err) {

            }
        })()
    }, [isUpdated])


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.post(`/answer/get_answers/${id}/?user_id=${user_id}`, {
                    "question_ids": questionIds
                })
                setShowAnsweredData(res.data.data)
            } catch (err) {

            }
        })()
    }, [isAnswered, questionIds, isUpdated])

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


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/user/get_user_info/?user_id=${user_id}`)
                setUserInfo(res.data.data)
                setUserName(`${res.data.data.first_name} ${res.data.data.last_name}`)
            } catch (err) {

            }
        })()
    }, [])

    const setRating = async data => {
        try {
            const res = await axios.post('/rating/set_rating/', data)
            setIsUpdated(!isUpdated)
        } catch (err) {

        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='User Questions' breadCrumbParent='Dashboard'
                     breadCrumbActive='User Questions'/>
        <Card>
            <CardBody>
                <p>Employee Name: {userName}</p>
                <p>Group Name: {group_name}</p>
                <Row>
                    <Col lg={10}>
                        {isAnswered !== false ? <Form>
                            {showAnsweredData.map((el, index) => {
                                return <Fragment key={index}>
                                    <Input
                                        type='hidden'
                                        name={`question_id[${index}]`}
                                        defaultValue={el.question.id}
                                    />
                                    <Row className='my-2'>
                                        <Col lg={8}>
                                            <FormGroup key={index}>
                                                <Label id={el.id}><strong>{el.question.title}<span
                                                    className='text-danger'>*</span></strong></Label>
                                                {el.question.question_type === 'multiple' ?
                                                    <div style={{marginTop: '1.5px'}}>
                                                        <CustomInput
                                                            type='radio'
                                                            disabled={true}
                                                            className='custom-control-Primary'
                                                            id={`Primary_${Math.random()}`}
                                                            label='I agree'
                                                            defaultChecked={el.answer === '1'}
                                                            defaultValue={'1'}
                                                            name={`answer[${index}]`}
                                                            inline
                                                        />
                                                        <CustomInput
                                                            type='radio'
                                                            disabled={true}
                                                            className='custom-control-Primary'
                                                            id={`Primary_${Math.random()}`}
                                                            label='Neutral'
                                                            defaultChecked={el.answer === '2'}
                                                            defaultValue={'2'}
                                                            name={`answer[${index}]`}
                                                            inline
                                                        />
                                                        <CustomInput
                                                            type='radio'
                                                            disabled={true}
                                                            className='custom-control-Primary'
                                                            id={`Primary_${Math.random()}`}
                                                            label='Not agree'
                                                            defaultChecked={el.answer === '3'}
                                                            defaultValue={'3'}
                                                            name={`answer[${index}]`}
                                                            inline
                                                        />
                                                        <CustomInput
                                                            type='radio'
                                                            disabled={true}
                                                            className='custom-control-Primary'
                                                            id={`Primary_${Math.random()}`}
                                                            label='Strongly Disagree'
                                                            defaultChecked={el.answer === '4'}
                                                            defaultValue={'4'}
                                                            name={`answer[${index}]`}
                                                            inline
                                                        />
                                                        <CustomInput
                                                            type='radio'
                                                            disabled={true}
                                                            className='custom-control-Primary'
                                                            id={`Primary_${Math.random()}`}
                                                            label='Declined to answer'
                                                            defaultChecked={el.answer === '5'}
                                                            defaultValue={'5'}
                                                            name={`answer[${index}]`}
                                                            inline
                                                        />
                                                    </div> : <Input
                                                        id={el.id}
                                                        type='textarea'
                                                        disabled={true}
                                                        required
                                                        defaultValue={el.answer}
                                                        name={`answer[${index}]`}
                                                    />}
                                            </FormGroup>
                                        </Col>
                                        <Col lg={2}>
                                            <FormGroup>
                                                <Label>Set eval</Label>
                                                <Input
                                                    onChange={e => {
                                                        setRating({
                                                            rating: e.target.value,
                                                            group_id: id,
                                                            question_id: el.question.id,
                                                            answer_id: el.id,
                                                            user_to_id: user_id
                                                        })
                                                    }}
                                                    type='select'
                                                    defaultValue={el.default_rating}
                                                >
                                                    <option>0</option>
                                                    <option>25</option>
                                                    <option>50</option>
                                                    <option>75</option>
                                                    <option>100</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={2}>
                                            Rating : {el.rating}%
                                        </Col>
                                    </Row>
                                </Fragment>
                            })}
                            <FormGroup>
                                Evaluation at the group level: {groupRating}%
                            </FormGroup>
                        </Form> : ''}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}

export default SetEvaluation