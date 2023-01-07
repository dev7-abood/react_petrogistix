import {useState, useEffect} from 'react'
import classnames from 'classnames'
import {useForm, Controller} from 'react-hook-form'
import {Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form} from 'reactstrap'
import {toast} from 'react-toastify';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import axios from 'axios'

const GeneralTabs = ({data}) => {

    const SignupSchema = yup.object().shape({
        'first_name': yup.string().required(),
        'last_name': yup.string().required(),
        'email': yup.string().email().required(),
    })

    const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

  const [userData, setUserData] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/user/get_user_info/')
                setUserData(res.data.data)
            } catch (err) {

            }
        })()
    }, [])

    const onSubmit = async data => {
        trigger()
        try {
            const res = await axios.put('/user/user_single_update/', data)
            toast.success(`${res.data.data.msg} ✔`)
        } catch (err) {

        }
    }

    return (
        <>
            <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='username'>Username</Label>
                            <Input
                                defaultValue={userData.username}
                                id='username'
                                placeholder='Username'
                                disabled={true}
                                className={classnames({
                                    'is-invalid': errors.username
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='name'>First name</Label>
                            <Input
                                defaultValue={userData.first_name}
                                id='first_name'
                                name='first_name'
                                placeholder='First name'
                                innerRef={register({required: true})}
                                onChange={e => setValue('first_name', e.target.value)}
                                className={classnames({
                                    'is-invalid': errors.first_name
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='last_name'>Last name</Label>
                            <Input
                                defaultValue={userData.last_name}
                                type='last_name'
                                id='last_name'
                                name='last_name'
                                placeholder='Last name'
                                innerRef={register({required: true})}
                                onChange={e => setValue('last_name', e.target.value)}
                                className={classnames({
                                    'is-invalid': errors.last_name
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='email'>E-mail</Label>
                            <Input
                                defaultValue={userData.email}
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email'
                                innerRef={register({required: true})}
                                onChange={e => setValue('email', e.target.value)}
                                className={classnames({
                                    'is-invalid': errors.email
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col className='mt-2' sm='12'>
                        <Button.Ripple type='submit' className='mr-1' color='primary'>
                            Save changes
                        </Button.Ripple>
                        <Button.Ripple color='secondary' outline>
                            Cancel
                        </Button.Ripple>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default GeneralTabs
