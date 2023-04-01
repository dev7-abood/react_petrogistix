
// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CustomInput
} from 'reactstrap'

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
      title='New Question'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form>

        <div className='demo-inline-spacing'>
          <CustomInput type='radio' id='exampleCustomRadio' name='customRadio' inline label='Textarea' defaultChecked />
          <CustomInput type='radio' id='exampleCustomRadio2' name='customRadio' inline label='Multiple choice' />
        </div>

        <FormGroup>
          <Label for='title'>
            Title <span className='text-danger'>*</span>
          </Label>
          <Input
            name='title'
            id='title'
            placeholder='How about ...?'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['title'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='title'>
            # of words <span className='text-danger'>*</span>
          </Label>
          <Input
              type='number'
              name='title'
              id='title'
              defaultValue={30}
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors['number_of_words'] })}
          />
        </FormGroup>

        {/*<FormGroup>*/}
        {/*  <Label for='answer'>*/}
        {/*    Answer <span className='text-danger'>*</span>*/}
        {/*  </Label>*/}
        {/*  <Input*/}
        {/*      type='textarea'*/}
        {/*      name='answer'*/}
        {/*      id='answer'*/}
        {/*      innerRef={register({ required: true })}*/}
        {/*      className={classnames({ 'is-invalid': errors['answer'] })}*/}
        {/*  />*/}
        {/*</FormGroup>*/}


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
