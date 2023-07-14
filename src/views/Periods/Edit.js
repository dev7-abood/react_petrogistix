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

const Edit = ({open, toggleSidebar, setIsUpdate, isUpdate, editData}) => {

    const SignupSchema = yup.object().shape({
        title: yup.string().required(),
        // status: yup.number().required(),
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [closeTimestamp, setCloseTimestamp] = useState(null)
    const [startTimestamp, setStartTimestamp] = useState(null)

    useEffect(_ => {
        if (editData.length !== 0 && editData['close_timestamp'] !== null) {
            try {
                setCloseTimestamp(editData['close_timestamp'].replace(":00Z", ""))
                setStartTimestamp(editData['start_timestamp'].replace(":00Z", ""))
            } catch (err) {}

        }
    }, [editData])

    const onSubmit = async data => {
        trigger()
        try {
            await axios.post('/period/create_period/', {...data,
                close_timestamp: closeTimestamp,
                start_timestamp: startTimestamp
            }, {
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

    return <>
        {!isObjEmpty(editData) ? <Sidebar
            size='lg'
            open={open}
            title='Edit Period'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name='id'
                    id='id'
                    innerRef={register({required: true})}
                    defaultValue={editData.id}
                    type='hidden'
                />
                <FormGroup>
                    <Label for='name'>Period Name <span className='text-danger'>*</span></Label>
                    <Input
                        defaultValue={editData.title}
                        name='title'
                        id='title'
                        placeholder='Programiers'
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['title']})}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='start_timestamp'>Start time</Label>
                    <Input
                        id='start_timestamp'
                        type='datetime-local'
                        defaultValue={startTimestamp}
                        onChange={e => setStartTimestamp(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='close_timestamp'>Close time</Label>
                    <Input
                        id='close_timestamp'
                        type='datetime-local'
                        defaultValue={closeTimestamp}
                        onChange={e => setCloseTimestamp(e.target.value)}
                    />
                </FormGroup>
                <Button type='submit' className='mr-1' color='primary'>
                    Update
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar> : ''}
    </>
}

export default Edit
