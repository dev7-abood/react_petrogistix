// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import HtmlTableToJson from 'html-table-to-json'

// ** Store & Actions

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [role, setRole] = useState('subscriber')
  const [plan, setPlan] = useState('basic')

  // ** Store Vars

  useEffect(_ => {
    const jsonTables = HtmlTableToJson.parse(`
        <table>
            <tr>
                <th>Animal</th>
                <th>Color</th>
                <th>Name</th>
            </tr>
            <tr>
                <td>Unicorn</td>
                <td>Pink</td>
                <td>Billy</td>
            </tr>
            <tr>
                <td>Walrus</td>
                <td>Orange</td>
                <td>Sue</td>
            </tr>
        </table>
    `);
    console.log(jsonTables.results);
  }, [])

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit


  return (
    <Sidebar
      size='lg'
      open={open}
      title='New html file'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form>
        <FormGroup>
          <Label for='file'>Upload html file<span className='text-danger'>*</span></Label>
          <Input type='file' id='file' name='file'/>
        </FormGroup>
        <FormGroup>
          <Label for='category'>Select a category</Label>
          <Input type='select' id='category' name='user-role' onChange={e => setRole(e.target.value)}>
            <option value=''></option>
            <option value='subscriber'>Subscriber</option>
            <option value='editor'>Editor</option>
            <option value='maintainer'>Maintainer</option>
            <option value='author'>Author</option>
            <option value='admin'>Admin</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='note'>Note</Label>
          <Input type='textarea' id='category' name='note'  onChange={e => setRole(e.target.value)} />
        </FormGroup>
        <hr/>
        <Button type='submit' className='mr-1' color='primary'>
          Save
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
