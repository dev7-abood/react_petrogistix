// ** React Import
import {useState, useEffect} from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import {isObjEmpty} from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {Button, FormGroup, Label, FormText, Form, Input} from 'reactstrap'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'

// ** Store & Actions

const Create = ({open, toggleSidebar, setIsUpdate, isUpdate, departments}) => {

    const SignupSchema = yup.object().shape({
        name: yup.string().required(),
        status: yup.number().required(),
    })

    const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        try {
            await axios.post('/department/create/', data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            setIsUpdate(!isUpdate)
            toast.success('Department add successfully ✔');
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
                    <Label for='name'>
                        Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='name'
                        id='name'
                        placeholder='Name'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['name']})}
                    />
                </FormGroup>
                <FormGroup className='' multiple>
                    <Label for='sub_department'>Sub Department</Label>
                    <Input type='select'
                           id='sub_department'
                           name='sub_department[]'
                           multiple
                           innerRef={register({required: true})}
                           className={classnames({'is-invalid': errors['sub_department']})}
                    >
                        {departments.map((el, index) => {
                          return <option key={index} value={el.id}>{el.name}</option>
                        })}
                    </Input>
                    <small>Hold [ctrl] and select</small>
                </FormGroup>
                <FormGroup>
                    <Label for='first_name'>
                        Status <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='select'
                        name='status'
                        id='status'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['status']})}
                    >
                        <option value='1'>Active</option>
                        <option value='0'>Disable</option>
                    </Input>
                </FormGroup>
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

export default Create
