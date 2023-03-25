import Breadcrumbs from '@components/breadcrumbs'
import {
    Label, Input, Card, CardBody, Row, Col, Form, FormGroup, Button, Progress
} from 'reactstrap'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'

import {useEffect, useState} from 'react'
import env from "@src/env.json";
// import axios from 'axios'

const index = _ => {

    const [years, setYears] = useState([])
    // const [isDisabled, setIsDisabled] = useState(false)
    // const [progressValue, setProgressValue] = useState(0)

    useEffect(_ => {
        const currentYear = new Date().getFullYear();
        const years = [2018]

        for (let i = 2018; i !== currentYear; ++i) {
            years.push(i + 1)
        }
        setYears(years)
    }, [])

    const months = [
        {number: '01', name: 'Jan'},
        {number: '02', name: 'Feb'},
        {number: '03', name: 'Mar'},
        {number: '04', name: 'Apr'},
        {number: '05', name: 'May'},
        {number: '06', name: 'Jun'},
        {number: '07', name: 'Jul'},
        {number: '08', name: 'Aug'},
        {number: '09', name: 'Sep'},
        {number: '10', name: 'Oct'},
        {number: '11', name: 'Nov'},
        {number: '12', name: 'Dec'}
    ]

    const SignupSchema = yup.object().shape({
        year: yup.string().required(), month: yup.string().required(),
    })

    const {register, errors, handleSubmit, setValue} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        // setProgressValue(0)
        // setProgressValue(100)
        // setIsDisabled(true)
        window.open(`${env.CHART_BACK_URL}/rig-chart/${data.month}/${data.year}/`, '_blank');
        // setIsDisabled(false)
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
                                    {months.map((el, index) => {
                                        return <option key={index} value={el.number}>{el.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <hr/>
                            {/*<Progress className={'my-2'} animated={isDisabled} color="success" value={progressValue}/>*/}
                            {/*<Button disabled={isDisabled} id='submit' type='submit' color='primary'>*/}
                            {/*    View*/}
                            {/*</Button> */}
                            <Button id='submit' type='submit' color='primary'>
                                View
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}


export default index