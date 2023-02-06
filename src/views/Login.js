import {useSkin} from '@hooks/useSkin'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import InputPasswordToggle from '@components/input-password-toggle'
import {Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, Alert} from 'reactstrap'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import classnames from 'classnames'
import axios from 'axios'
import {useEffect, useState} from 'react'
import env from '@src/env.json'
import {FiAlertTriangle} from 'react-icons/fi';
import jwt_decode from "jwt-decode"
import '@styles/base/pages/page-auth.scss'

const Login = () => {
    const [skin, setSkin] = useSkin()

    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const SignupSchema = yup.object().shape({
        username: yup.string().required(), password: yup.string().required()
    })

    const {register, errors, handleSubmit, control, setValue, trigger, reset} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [isLoginError, setIsLoginError] = useState(false)

    const [userId, setUserId] = useState(null)
    useEffect(_ => {
        if (userId !== null) {
            (async _ => {
                try {
                    const res = await axios.get(`/user/get_user_info/`)
                    localStorage.setItem('user_data', JSON.stringify(res.data.data))
                    location.href = '/'
                } catch (err) {
                    console.log(err)
                }
            })()
        }
    }, [userId])

    const loginHandle = data => {
        (async _ => {
            try {
                const res = await axios.post('/user/token/', data)
                localStorage.removeItem('access_tk')
                localStorage.removeItem('refresh_tk')
                localStorage.removeItem('user_data')
                localStorage.setItem('access_tk', res.data.access)
                localStorage.setItem('refresh_tk', res.data.refresh)
                setUserId(jwt_decode(res.data.access).user_id)
                setIsLoginError(false)
            } catch (err) {
                setIsLoginError(true)
            }
        })()
    }

    const [logo, setLogo] = useState('')
    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/setting/get_setting_value/?name=big_logo')
                setLogo(`${env.BACK_BASE_URL}${res.data.data.value}`)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (<div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
            <Link className='brand-logo' to='/'>
                <img src={logo} width='150'/>
            </Link>
            <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                    <img className='img-fluid' src={source} alt='Login V2'/>
                </div>
            </Col>
            <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                    <CardTitle tag='h2' className='font-weight-bold mb-1 text-upper'>
                        Welcome to Petrogistix! 👋
                    </CardTitle>
                    {isLoginError ? <Alert className='p-1 d-flex align-content-center' color='warning'><FiAlertTriangle
                        size={18}/> &nbsp; <span className='d-inline-block'>Recorded data error!</span></Alert> : ''}
                    <Form className='auth-login-form mt-2' onSubmit={handleSubmit(loginHandle)}>
                        <FormGroup>
                            <Label className='form-label' for='username'>
                                Username
                            </Label>
                            <Input
                                type='text'
                                as={control}
                                name='username'
                                innerRef={register({required: true})}
                                onChange={e => setValue('username', e.target.value)}
                                id='username'
                                placeholder='john@example.com'
                                autoFocus
                                className={classnames({
                                    'is-invalid': errors.username
                                })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <div className='d-flex justify-content-between'>
                                <Label className='form-label' for='password'>
                                    Password
                                </Label>
                                <Link to='/'>
                                    <small>Forgot Password?</small>
                                </Link>
                            </div>
                            <Input
                                id='password'
                                innerRef={register({required: true})}
                                type='password'
                                name='password'
                                onChange={e => setValue('password', e.target.value)}
                                className={classnames('input-group-merge', {
                                    'is-invalid': errors.password
                                })}
                            />
                        </FormGroup>
                        <Button type='submit' color='primary' block>
                            Sign in
                        </Button>
                    </Form>
                </Col>
            </Col>
        </Row>
    </div>)
}

export default Login
