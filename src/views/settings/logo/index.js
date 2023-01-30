import {Card, CardBody, Input, Row, Col, Button, Form} from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import axios from 'axios'
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'
import {useEffect, useState} from 'react'
import * as yup from 'yup'
import env from "@src/env.json";
import {useDispatch} from 'react-redux'
import {updateLayout} from '@store/actions/updateLayout'

const Logo = _ => {

    const dispatch = useDispatch()

    const SignupSchema = yup.object().shape({
        big_logo: yup.mixed().test('fileType', 'Invalid scenario image file format', value => {
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
            try {
                return SUPPORTED_FORMATS.includes(value[0].type);
            } catch (err) {
                return true
            }
        }),
        small_logo: yup.mixed().test('fileType', 'Invalid scenario image file format', value => {
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
            try {
                return SUPPORTED_FORMATS.includes(value[0].type);
            } catch (err) {
                return true
            }
        }),
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [formUpdate, setFormUpdate] = useState(false)
    const [bigLogo, setBigLogo] = useState('')
    const [smallLogo, setSmallLogo] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/setting/get_setting_value/?name=big_logo')
                setBigLogo(`${env.BACK_BASE_URL}${res.data.data.value}`)
            } catch (err){
                console.log(err)
            }
        })()
    }, [formUpdate])

    useEffect(_ => {
        (async _ => {
           try {
               const res = await axios.get('/setting/get_setting_value/?name=small_logo')
               setSmallLogo(`${env.BACK_BASE_URL}${res.data.data.value}`)
           } catch (err){
               console.log(err)
           }
        })()
    }, [formUpdate])

    const onSubmit = async data => {
        trigger()
        try {
            const formData = new FormData()
            formData.append('big_logo', data.big_logo[0])
            formData.append('small_logo', data.small_logo[0])
            const res = await axios.post('/setting/update_site_logo/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            toast.success(res.data.msg)
            setFormUpdate(!formUpdate)
            dispatch(updateLayout())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Logo' breadCrumbParent='Settings' breadCrumbActive='Logo'/>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col lg='4'>
                                <Input
                                    type='file'
                                    id='big_logo'
                                    name='big_logo'
                                    innerRef={register({required: true})}
                                    className={classnames('mb-1', {
                                        'is-invalid': errors['big_logo']
                                    })}
                                />
                                <small>Big logo 500x500</small>
                            </Col>
                            <Col className='d-flex justify-content-center' lg='4'>
                                <a href={bigLogo}
                                   download
                                >
                                    <img width='250' className='img-fluid img-thumbnail' alt=''
                                         src={bigLogo}/>
                                </a>
                            </Col>
                        </Row>
                        <Row className='my-1'>
                            <Col lg='4'>
                                <Input
                                    type='file'
                                    id='small_logo'
                                    name='small_logo'
                                    innerRef={register({required: true})}
                                    className={classnames('mb-1', {
                                        'is-invalid': errors['small_logo']
                                    })}
                                />
                                <small>Small logo 250x250</small>
                            </Col>
                            <Col className='d-flex justify-content-center' lg='4'>
                                <a href={smallLogo}
                                   download
                                >
                                    <img width='250' className='img-fluid img-thumbnail' alt=''
                                         src={smallLogo}
                                    />
                                </a>
                            </Col>
                        </Row>
                        <Button color='primary'>Update</Button>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}

export default Logo