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

const Edit = ({open, toggleSidebar, editData, setIsUpdate, isUpdate}) => {

    const SignupSchema = yup.object().shape({
        name: yup.string().required(),
        status: yup.number().required()
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        try {
            await axios.put(`/department/update/${editData.id}/`, data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            setIsUpdate(!isUpdate)
            toast.success('Department add successfully ✔');
        } catch (err) {
            console.log(err)
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
                        defaultValue={editData.name}
                        name='name'
                        id='name'
                        placeholder='Name'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['name']})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='first_name'>
                        Status <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        defaultValue={editData.status}
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

export default Edit
