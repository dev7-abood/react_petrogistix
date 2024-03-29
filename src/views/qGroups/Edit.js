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

const Edit = ({open, toggleSidebar, setIsUpdate, isUpdate, editData, periods}) => {

    const SignupSchema = yup.object().shape({
        name: yup.string().required(),
        status: yup.number().required(),
        // period_id: yup.number().required(),
    })

    const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const onSubmit = async data => {
        trigger()
        try {
            await axios.put(`group/update/${editData.id}/`, data, {
                headers: {
                    Accept: 'application/json'
                }
            })
            setIsUpdate(!isUpdate)
            toast.success('Group Question record updated successfully ✔');
        } catch (err) {
            toast.error('Something wrong ❌');
        }
    }

    const [departments, setDepartments] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/department/get_departments/`)
                setDepartments(res.data.data)
            } catch (err) {}
        })()
    }, [])

    return (
        <Sidebar
            size='lg'
            open={open}
            title='Edit Group'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for='name'>Group Name <span className='text-danger'>*</span></Label>
                    <Input
                        defaultValue={editData.name}
                        name='name'
                        id='name'
                        placeholder='Programiers'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['name']})}
                    />
                </FormGroup>
                <FormGroup className='mb-2'>
                    <Label for='period_id'>Period</Label>
                    <Input
                        type='select'
                        name='period_id'
                        id='period_id'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['period_id']})}
                        defaultValue={editData.period_id}
                    >
                        <option value='0'>-</option>
                        {periods.map((el, index) => {
                            return <option key={index} value={el.id}>{el.title}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup className='mb-2'>
                    <Label for='department'>Departments</Label>
                    <Input
                        required
                        multiple
                        type='select'
                        name='department'
                        id='department'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['department']})}
                        defaultValue={editData.default_departments}
                    >
                        {/*<option value='-'>-</option>*/}
                        {departments.map((el, index) => {
                            return <option key={index} value={el.value}>{el.label}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup className='mb-2'>
                    <Label for='status'>Status</Label>
                    <Input
                        type='select'
                        name='status'
                        id='status'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['status']})}
                        defaultValue={editData.status}
                    >
                        <option value='1'>Active</option>
                        <option value='0'>Disabled</option>
                    </Input>
                </FormGroup>
                <Button type='submit' className='mr-1' color='primary'>
                    Update
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default Edit
