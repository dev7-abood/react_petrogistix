import {Card, CardHeader, CardTitle, CardBody, Input, Label, Row, Col, Button, Form} from 'reactstrap'
import {useEffect, useState} from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import axios from 'axios'
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import {updateLayout} from '@store/actions/updateLayout'

const SiteName = _ => {
    const dispatch = useDispatch()

    const SignupSchema = yup.object().shape({
        site_name: yup.string().required(),
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [siteName, setSiteName] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/setting/get_setting_value/?name=site_name')
                setSiteName(res.data.data.value)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const onSubmit = async data => {
        trigger()
        try {
            const res = await axios.post('/setting/update_site_name/', {
                value: data.site_name
            })
            toast.success(res.data.msg)
            dispatch(updateLayout())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Site name' breadCrumbParent='Settings' breadCrumbActive='Site name'/>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col lg='6'>
                                <Label for='site-name'>Site name</Label>
                                <Input
                                    defaultValue={siteName}
                                    id='site_name'
                                    name='site_name'
                                    innerRef={register({required: true})}
                                    className={classnames('mb-1', {
                                        'is-invalid': errors['site_name']
                                    })}
                                />
                                <hr/>
                                <Button color='primary'>Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}

export default SiteName