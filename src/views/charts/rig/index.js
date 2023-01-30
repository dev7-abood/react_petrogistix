import Breadcrumbs from '@components/breadcrumbs'
import {
    Label, Input, Card, CardBody, Row, Col, Form, FormGroup, Button, Progress
} from 'reactstrap'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'

import {useEffect, useState} from 'react'
import axios from 'axios'

const index = _ => {

    const [years, setYears] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [progressValue, setProgressValue] = useState(0)

    useEffect(_ => {
        const currentYear = new Date().getFullYear();
        const years = [2018]

        for (let i = 2018; i !== currentYear; ++i) {
            years.push(i + 1)
        }
        setYears(years)
    }, [])

    const [months, setMonths] = useState({
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
    })

    const SignupSchema = yup.object().shape({
        year: yup.string().required(), month: yup.string().required(),
    })

    const {register, errors, handleSubmit, setValue} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        setProgressValue(0)
        setProgressValue(100)
        setIsDisabled(true)
        try {
            const res = await axios.get(`chart/rig_chart/${data.year}/${data.month}/`)
            // const mainWindow = window.open("", "_blank")
            // mainWindow.document.write(res.data.data.html)
            const mainWindow = window.open("", "MsgWindow", "width=800,height=800");
            mainWindow.document.write(res.data.data.html);
            setIsDisabled(false)
        } catch (err) {

        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='Rig Chart view' breadCrumbParent='Dashboard'
                     breadCrumbActive='Rig Chart view'/>
        <Card>
            <CardBody>
                <Row>
                    <Col lg={6}>
                        <Form action='/' className='auth-register-form' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label htmlFor='year'>Year<span className='text-danger'>*</span></Label>
                                <Input
                                    defaultValue={''}
                                    id='year'
                                    name='year'
                                    placeholder=''
                                    type={'select'}
                                    innerRef={register({required: true})}
                                    onChange={e => setValue('year', e.target.value)}
                                    className={classnames({
                                        'is-invalid': errors.year
                                    })}
                                >
                                    {years.map((el, index) => {
                                        return <option key={index} value={el}>{el}</option>
                                    })}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor='month'>Months<span className='text-danger'>*</span></Label>
                                <Input
                                    defaultValue={''}
                                    id='month'
                                    name='month'
                                    placeholder=''
                                    type={'select'}
                                    innerRef={register({required: true})}
                                    onChange={e => setValue('month', e.target.value)}
                                    className={classnames({
                                        'is-invalid': errors.month
                                    })}
                                >
                                    {Object.keys(months).map((el, index) => {
                                        return <option key={index} value={el}>{months[el]}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <hr/>
                            <Progress className={'my-2'} animated={isDisabled} color="success" value={progressValue}/>
                            <Button disabled={isDisabled} id='submit' type='submit' color='primary'>
                                Start view
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}


export default index