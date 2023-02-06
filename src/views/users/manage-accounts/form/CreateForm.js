// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'

// ** Store & Actions

const CreateForm = ({ open, toggleSidebar }) => {

    const SignupSchema = yup.object().shape({
        email : yup.string().required().email(),
        username : yup.string().required(),
        first_name : yup.string().required(),
        last_name : yup.string().required()
    })

    const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        console.log(data)
        try {
            await axios.post('/user/create/', data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            toast.success('The user has been registered successfully ✔');
        } catch (err) {
            toast.error('Something wrong ❌');
        }
    }


    return (
        <Sidebar
            size='lg'
            open={open}
            title='New User'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for='username'>
                        Username <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='username'
                        id='username'
                        placeholder='johnDoe99'
                        innerRef={register({ required: true })}
                        className={classnames({ 'is-invalid': errors['username'] })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='first_name'>
                        First Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='first_name'
                        id='first_name'
                        placeholder='John'
                        innerRef={register({ required: true })}
                        className={classnames({ 'is-invalid': errors['first_name'] })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='last_name'>
                        Last Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='last_name'
                        id='last_name'
                        placeholder='Doe'
                        innerRef={register({ required: true })}
                        className={classnames({ 'is-invalid': errors['last_name'] })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='email'>
                        Email <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='john.doe@example.com'
                        innerRef={register({ required: true })}
                        className={classnames({ 'is-invalid': errors['email'] })}
                    />
                    <FormText color='muted'>You can use letters, numbers & periods</FormText>
                </FormGroup>
                {/*<FormGroup>*/}
                {/*    <Label for='contact'>*/}
                {/*        Contact <span className='text-danger'>*</span>*/}
                {/*    </Label>*/}
                {/*    <Input*/}
                {/*        name='contact'*/}
                {/*        id='contact'*/}
                {/*        placeholder='(397) 294-5153'*/}
                {/*        innerRef={register({ required: true })}*/}
                {/*        className={classnames({ 'is-invalid': errors['contact'] })}*/}
                {/*    />*/}
                {/*</FormGroup>*/}
                <Button type='submit' className='mr-1' color='primary'>
                    Submit
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default CreateForm