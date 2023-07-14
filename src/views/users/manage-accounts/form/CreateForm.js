// ** React Import
import {useState, useEffect} from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {Button, FormGroup, Label, Form, Input, Spinner} from 'reactstrap'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'

// ** Store & Actions

const CreateForm = ({open, toggleSidebar, setIsUpdate, isUpdate}) => {

    const SignupSchema = yup.object().shape({
        email: yup.string().required().email(),
        username: yup.string().required(),
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        job: yup.string().required(),
        departments: yup.array().required()
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [jobs, setJobs] = useState([])
    const [departments, setDepartment] = useState([])
    const [reErrors, setResErrors] = useState({})

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/job/list/`)
                setJobs(res.data.results.reverse())
            } catch (err) {

            }
        })()
    }, [])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/department/list/`)
                setDepartment(res.data.results)
            } catch (err) {

            }
        })()
    }, [])

    useEffect(_ => {
        if (reErrors.username !== undefined) {
            errors.username = reErrors.username[0]
        }

        if (reErrors.email !== undefined) {
            errors.email = reErrors.email[0]
        }

    }, [reErrors])

    const onSubmit = async data => {
        trigger()
        setIsUpdate(!isUpdate)
        try {
            const res = await axios.post('/user/create/', data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            toast.success('The user has been registered successfully ✔')
            setIsUpdate(false)
            setTimeout(_ => {
                setIsUpdate(false)
                location.href = `user/permissions/${res.data.id}`
            }, 1800)
        } catch (err) {
            setIsUpdate(false)
            setResErrors(err.response.data)
            toast.error('Something wrong ❌');
            // setTimeout(_ => {
            //     location.reload()
            // }, 1800)
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
                    {errors['email'] ? <p className='text-danger mt-1'>{errors['email']}</p> : ''}
                    <Label for='email'>
                        Email <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='john.doe@example.com'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['email']})}
                    />
                </FormGroup>
                <FormGroup>
                    {errors['username'] ? <p className='text-danger mt-1'>{errors['username']}</p> : ''}
                    <Label for='username'>
                        Username <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='username'
                        id='username'
                        placeholder='johnDoe99'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['username']})}
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
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['first_name']})}
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
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['last_name']})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='job'>Job <span className='text-danger'>*</span></Label>
                    <Input
                        required
                        type='select'
                        name='job'
                        id='job'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['job']})}
                    >
                        {jobs.map((el, index) => {
                            return <option key={index} value={el.id}>{el.name}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='Departments'>Departments <span className='text-danger'>*</span></Label>
                    <Input
                        required
                        multiple
                        type='select'
                        name='departments'
                        id='departments'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['departments']})}
                    >
                        {departments.map((el, index) => {
                            return <option key={index} value={el.id}>{el.name}</option>
                        })}
                    </Input>
                </FormGroup>
                <Button type='submit' className='mr-1' color='primary'>
                    {isUpdate === true ? <>
                        <Spinner color='white' size='sm'/>
                        <span className='ml-50'>Submitting...</span>
                    </> : 'Submit'}
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default CreateForm
