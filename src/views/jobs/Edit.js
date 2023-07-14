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

const Edit = ({open, toggleSidebar, setIsUpdate, isUpdate, departments, editData}) => {

  const SignupSchema = yup.object().shape({
    name: yup.string().required(),
    status: yup.number().required(),
    // department_id: yup.number().required(),
  })

  const {register, errors, handleSubmit, control, setValue, trigger} = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async data => {
    trigger()
    try {
      await axios.put(`job/update/${editData.id}/`, data, {
        headers: {
          Accept: 'application/json'
        }
      })
      setIsUpdate(!isUpdate)
      toast.success('Job record updated successfully ✔');
    } catch (err) {
      toast.error('Something wrong ❌');
    }
  }

  return (
      <Sidebar
          size='lg'
          open={open}
          title='Edit job'
          headerClassName='mb-1'
          contentClassName='pt-0'
          toggleSidebar={toggleSidebar}
      >
        <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='department_name'>Name <span className='text-danger'>*</span></Label>
            <Input
                defaultValue={editData.name}
                name='name'
                id='name'
                placeholder='Programiers'
                innerRef={register({required: true})}
                className={classnames({'is-invalid': errors['name']})}
            />
          </FormGroup>
          {/*<FormGroup>*/}
          {/*  <Label for='department'>Blong to<span className='text-danger'>*</span></Label>*/}
          {/*  <Input type='select'*/}
          {/*         id='department_id'*/}
          {/*         name='department_id'*/}
          {/*         defaultValue={editData.department_id}*/}
          {/*         innerRef={register({required: true})}*/}
          {/*         className={classnames({'is-invalid': errors['department_id']})}*/}
          {/*  >*/}
          {/*    {departments.map((el, index) => {*/}
          {/*      return <option key={index} value={el.id}>{el.name}</option>*/}
          {/*    })}*/}
          {/*  </Input>*/}
          {/*</FormGroup>*/}

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
