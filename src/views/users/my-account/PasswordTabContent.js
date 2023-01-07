import * as yup from 'yup'
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Form, FormGroup, Row, Col, Button} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import {toast} from 'react-toastify'
import axios from 'axios'

const PasswordTabContent = () => {
    const SignupSchema = yup.object().shape({
        'old_password': yup.string().required(),
        'password': yup.string().required(),
        'conform_password': yup
            .string()
            .required()
            .oneOf([yup.ref(`password`), null], 'Passwords must match')
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        try {
            const res = await axios.put('/user/update_password/', {
                old_password: data.old_password,
                password: data.password
            })
            if (res.data.data.status) {
                toast.success(`${res.data.data.msg} ✔`)
            } else {
                toast.error(`${res.data.data.msg} ❌`)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm='6'>
                    <FormGroup>
                        <InputPasswordToggle
                            label='Old Password'
                            htmlFor='old_password'
                            name='old_password'
                            innerRef={register({required: true})}
                            className={classnames('input-group-merge', {
                                'is-invalid': errors['old_password']
                            })}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm='6'>
                    <FormGroup>
                        <InputPasswordToggle
                            label='New Password'
                            htmlFor='password'
                            name='password'
                            innerRef={register({required: true})}
                            className={classnames('input-group-merge', {
                                'is-invalid': errors['password']
                            })}
                        />
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup>
                        <InputPasswordToggle
                            label='Retype New Password'
                            htmlFor='conform_password'
                            name='conform_password'
                            innerRef={register({required: true})}
                            className={classnames('input-group-merge', {
                                'is-invalid': errors['conform_password']
                            })}
                        />
                    </FormGroup>
                </Col>
                <Col className='mt-1' sm='12'>
                    <Button.Ripple type='submit' className='mr-1' color='primary'>
                        Save changes
                    </Button.Ripple>
                    <Button.Ripple color='secondary' outline>
                        Cancel
                    </Button.Ripple>
                </Col>
            </Row>
        </Form>
    )
}

export default PasswordTabContent
