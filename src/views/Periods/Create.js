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

const Create = ({open, toggleSidebar, setIsUpdate, isUpdate}) => {

    const SignupSchema = yup.object().shape({
        title: yup.string().required(),
        status: yup.number().required(),
    })

    const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        try {
            await axios.post('/period/create_period/', data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            setIsUpdate(!isUpdate)
            toast.success('Questions Group add successfully ✔');
        } catch (err) {
            toast.error('Something wrong ❌');
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='Create Period'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name='id'
                    id='id'
                    innerRef={register({required: true})}
                    defaultValue={null}
                    type='hidden'
                />
                <FormGroup>
                    <Label for='name'>Period Name <span className='text-danger'>*</span></Label>
                    <Input
                        name='title'
                        id='title'
                        placeholder='Programiers'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['title']})}
                    />
                </FormGroup>

                <FormGroup className='mb-2'>
                    <Label for='status'>Status</Label>
                    <Input
                        type='select'
                        name='status'
                        id='status'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['status']})}
                    >
                        <option value='1'>Active</option>
                        <option value='0'>Disabled</option>
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
