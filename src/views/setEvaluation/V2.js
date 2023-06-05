import {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import {FiAlertTriangle} from 'react-icons/fi'
import {
    Card, CardBody, Form, FormGroup, Input, Row, Col, Label, CustomInput, Alert
} from 'reactstrap'


const V2 = props => {

    const {user_id} = props.match.params
    const [data, setData] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [totalRating, setTotalRating] = useState(0)
    const [userName, setUserName] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/evaluation/get_all_q/${user_id}/`)
                setData(res.data.data.questions)
            } catch (err) {

            }
        })()
    }, [isUpdated])


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/user/get_user_info/?user_id=${user_id}`)
                setTotalRating(res.data.data.rating)
                setUserName(`${res.data.data.first_name} ${res.data.data.last_name}`)
            } catch (err) {

            }
        })()
    }, [isUpdated])


    const setRating = async data => {
        try {
            const res = await axios.post('/rating/set_rating/', data)
            setIsUpdated(!isUpdated)
        } catch (err) {

        }
    }

    return (
        <>
            <Breadcrumbs breadCrumbTitle='User Questions' breadCrumbParent='Dashboard'
                         breadCrumbActive='User Questions'/>
            <Card>
                <CardBody>
                    <p><strong>Employee Name: {userName}</strong></p>
                    {data.map((el, index) => {
                        return <Fragment key={index}>
                            <Row className='my-2'>
                                <Col lg={8}>
                                    <FormGroup key={index}>
                                        <Label id={el.id}><strong>{el.title}</strong> {el.answer.answer === null ?
                                            (<small className='text-warning'>
                                                Not answered yet from user.
                                            </small>) : ''}</Label>
                                        {el.question_type === 'multiple' ? <div style={{marginTop: '1.5px'}}>
                                            <CustomInput
                                                type='radio'
                                                disabled={true}
                                                className='custom-control-Primary'
                                                id={`Primary_${Math.random()}`}
                                                label='I agree'
                                                defaultChecked={el.answer.answer === '1'}
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
                                                defaultChecked={el.answer.answer === '2'}
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
                                                defaultChecked={el.answer.answer === '3'}
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
                                                defaultChecked={el.answer.answer === '4'}
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
                                                defaultChecked={el.answer.answer === '5'}
                                                defaultValue={'5'}
                                                name={`answer[${index}]`}
                                                inline
                                            />
                                        </div> : <Input
                                            id={el.id}
                                            type='textarea'
                                            disabled={true}
                                            required
                                            defaultValue={el.answer.answer}
                                            name={`answer[${index}]`}
                                        />}
                                    </FormGroup>
                                </Col>
                                <Col lg={2}>
                                    <Label>Set eval</Label>
                                    <Input
                                        onChange={e => {
                                            setRating({
                                                rating: e.target.value,
                                                group_id: el.group,
                                                question_id: el.id,
                                                answer_id: el.answer.id,
                                                user_to_id: user_id
                                            })
                                        }}
                                        type='select'
                                        disabled={el.answer.answer === null}
                                        defaultValue={el.answer.default_rating}
                                    >
                                        <option>0</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>75</option>
                                        <option>100</option>
                                    </Input>
                                </Col>
                                <Col lg={2} className='d-flex align-items-center' title={'The result of all users rating the question.'}>
                                    Rating : {el.answer.rating}%
                                </Col>
                            </Row>
                        </Fragment>
                    })}
                    <FormGroup>
                        User total AVG : {totalRating}%
                    </FormGroup>
                </CardBody>
            </Card>
        </>
    )
}

export default V2