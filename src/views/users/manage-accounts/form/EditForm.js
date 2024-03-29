// ** React Import
import {useState, useEffect} from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import {isObjEmpty} from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {Button, FormGroup, Label, FormText, Form, Input, Alert, Spinner} from 'reactstrap'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'

// ** Store & Actions

const EditForm = ({open, toggleSidebar, data}) => {

    const SignupSchema = yup.object().shape({
        email: yup.string().required().email(),
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        job_id: yup.string().required(),
        departments: yup.array().required()
    })

    const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [jobs, setJobs] = useState([])
    const [departments, setDepartment] = useState([])
    const [reErrors, setResErrors] = useState({})

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/job/list/`)
                setJobs(res.data.results)
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

    const [isUpdate, setIsUpdate] = useState(false)

    const onSubmit = async form_data => {
        trigger()
        setIsUpdate(true)
        try {
            await axios.put(`/user/custom_update/${data.id}/`, form_data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            toast.success('The user has been registered successfully ✔');
            setIsUpdate(false)
            location.reload()
        } catch (err) {
            setIsUpdate(false)
            setResErrors(err.response.data)
        }
    }


    return (
        <>
            {data.length !== 0 ? <Sidebar
                size='lg'
                open={open}
                title='Edit User'
                headerClassName='mb-1'
                contentClassName='pt-0'
                toggleSidebar={toggleSidebar}
            >
                <Alert color='warning' className='p-1'>Note: When you click on update, the password will be updated also.</Alert>
                <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        {errors['email'] ? <p className='text-danger mt-1'>{errors['email']}</p> : ''}
                        <Label for='email'>
                            Email <span className='text-danger'>*</span>
                        </Label>
                        <Input
                            defaultValue={data.email}
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
                            Username
                        </Label>
                        <Input
                            defaultValue={data.username}
                            disabled={true}
                            id='username'
                            placeholder='John99'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='first_name'>
                            First Name <span className='text-danger'>*</span>
                        </Label>
                        <Input
                            defaultValue={data.first_name}
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
                            defaultValue={data.last_name}
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
                            name='job_id'
                            id='job_id'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['job_id']})}
                            defaultValue={data.job.job_id}
                        >
                            {jobs.map((el, index) => {
                                return <option key={index} value={el.id}>{el.name}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='Departments'>Departments <span className='text-danger'>*</span></Label>
                        <Input
                            multiple
                            required
                            type='select'
                            name='departments'
                            id='departments'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['departments']})}
                            defaultValue={data.departments.ids}
                        >
                            {departments.map((el, index) => {
                                return <option key={index} value={el.id}>{el.name}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <Button type='submit' className='mr-1' color='primary'>
                        {isUpdate === true ? <>
                            <Spinner color='white' size='sm'/>
                            <span className='ml-50'>Updating...</span>
                        </> : 'Update'}
                    </Button>
                    <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                        Cancel
                    </Button>
                </Form>
            </Sidebar> : ''}
        </>
    )
}

export default EditForm
