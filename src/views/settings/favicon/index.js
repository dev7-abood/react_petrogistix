import {Card, CardBody, Input, Row, Col, Button, Form} from 'reactstrap'
import axios from 'axios'
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'
import * as yup from 'yup'
import Breadcrumbs from '@components/breadcrumbs'
import {useEffect, useState} from 'react'
import env from "@src/env.json";

const Favicon = _ => {

    const SignupSchema = yup.object().shape({
        favicon: yup.mixed().test('fileType', 'Invalid scenario image file format', value => {
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
            try {
                return SUPPORTED_FORMATS.includes(value[0].type);
            } catch (err) {
                return true
            }
        })
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [formUpdate, setFormUpdate] = useState(false)
    const [favicon, setFavicon] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/setting/get_setting_value/?name=favicon')
                setFavicon(`${env.BACK_BASE_URL}${res.data.data.value}`)
            } catch (err){
                console.log(err)
            }
        })()
    }, [formUpdate])
    const onSubmit = async data => {
        trigger()
        try {
            const formData = new FormData()
            formData.append('favicon', data.favicon[0])
            const res = await axios.post('/setting/update_favicon/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            toast.success(res.data.msg)
            setFormUpdate(!formUpdate)
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
            <Breadcrumbs breadCrumbTitle='Favicon' breadCrumbParent='Settings' breadCrumbActive='Favicon'/>
            <Card>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody>
                        <Row>
                            <Col lg='4'>
                                <Input
                                    type='file'
                                    id='favicon'
                                    name='favicon'
                                    innerRef={register({required: true})}
                                    className={classnames('mb-1', {
                                        'is-invalid': errors['favicon']
                                    })}
                                />
                                <small>favicon 20x20</small>
                            </Col>
                            <Col className='d-flex justify-content-center' lg='4'>
                                <a href={favicon}
                                   download
                                >
                                    <img width='50' className='' alt=''
                                         src={favicon}
                                    />
                                </a>
                            </Col>
                        </Row>
                        <Button color='primary my-1'>Update</Button>
                    </CardBody>
                </Form>
            </Card>
        </>)
}

export default Favicon