// ** React Import
import { useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Utils
import { isObjEmpty } from '@utils';

// ** Third Party Components
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap';

// ** Store & Actions

const SidebarNewUsers = ({ open, toggleSidebar }) => {

  // ** Store Vars

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Edit Department'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form>
        <FormGroup>
          <Label for='department_name'>
            Department Name <span className='text-danger'>*</span>
          </Label>
          <Input
              name='department_name'
              id='department_name'
              placeholder='Software engineers'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors['department_name'] })}
          />
        </FormGroup>

        <FormGroup className='mb-2' multiple>
          <Label for='sub_department'>Sub Department</Label>
          <Input type='select' id='sub_department' name='sub_department' multiple>
            <option value='basic'>Dep 1</option>
            <option value='basic'>Dep 2</option>
            <option value='basic'>Dep 3</option>
            <option value='basic'>Dep 4</option>
          </Input>
          <small>Hold [ctrl] and select</small>
        </FormGroup>

        <FormGroup className='mb-2'>
          <Label for='status'>Status</Label>
          <Input type='select' id='status' name='status'>
            <option value='basic'>Active</option>
            <option value='enterprise'>Disabled</option>
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

export default SidebarNewUsers
