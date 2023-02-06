import {useEffect, useState} from 'react'
import axios from 'axios'
import {
    Label, Input, Card, CardHeader, CardBody, Row, CardTitle, Col, Form, FormGroup, Button, Progress
} from 'reactstrap'
// import { toast } from 'react-toastify'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useForm, Controller} from 'react-hook-form'
import classnames from 'classnames'
import {updateLayout} from '@store/actions/updateLayout'
import {useDispatch} from 'react-redux'
import TreeFileView from "./TreeFileView";
import Alert from 'react-bootstrap/Alert';
import {RiGuideLine} from 'react-icons/ri';

const CollectionForm = _ => {

    const dispatch = useDispatch()

    const [onUploadProgress, setOnUploadProgress] = useState(0)
    const [progressAnimated, setProgressAnimated] = useState(true)
    const [progressColor, setProgressColor] = useState('primary')
    const [progressKey, setProgressKey] = useState(null)
    const [progressMeg, setProgressMeg] = useState('On proposes...')

    const SignupSchema = yup.object().shape({
        note: yup.string(),
        file: yup.mixed().test('fileType', 'Invalid collection file format it must be .zip', value => {
            const SUPPORTED_FORMATS = ['application/x-zip-compressed'];
            try {
                return SUPPORTED_FORMATS.includes(value[0].type);
            } catch (err) {
                return true
            }
        }).test('required', 'File collection is required', value => {
            return value.length;
        }),
    })

    const {register, errors, handleSubmit, control, setValue, trigger, setFieldValue} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [inProgress, setInProgress] = useState(false)

    useEffect(_ => {
        if (progressKey !== null) {
            const checkProcessStatus = setInterval(_ => {
                (async _ => {
                    const res = await axios.get(`/data-exstr/collection/check_process_status/?format=json&process_key=${progressKey}`)
                    if (res.data.process_status.on_process === false) {
                        setProgressAnimated(false)
                        setProgressColor('success')
                        setProgressMeg('Done')
                        setInProgress(false)
                    }
                })()
            }, 15000)

            if (progressAnimated === false) {
                clearInterval(checkProcessStatus);
            }
        }
    }, [progressKey])

    const onSubmit = data => {

        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("note", data.note);

        (async _ => {
            try {
                const res = await axios.post(`/data-exstr/collection/create/`, formData, {
                    onUploadProgress: (event) => {
                        const process = (event.loaded * 100) / event.total
                        setOnUploadProgress(process)
                        if (process === 100) {
                            setProgressAnimated(true)
                        }
                    }, headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setProgressKey(res.data.data.process_key)
                setInProgress(true)
                dispatch(updateLayout())
            } catch (err) {
                // console.log(err)
            }
        })()
    }

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>Form Collection</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col lg='6' sm='6'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label for='file'>Collection File<span className='text-danger'>*</span></Label>
                                <Input
                                    type='file'
                                    id='file'
                                    name='file'
                                    innerRef={register({required: true})}
                                    accept="application/x-zip-compressed"
                                    className={classnames({
                                        'is-invalid': errors.file
                                    })}
                                />
                                <small>The File Type Is zip</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for='note'>Note</Label>
                                <Input
                                    defaultValue={''}
                                    id='note'
                                    name='note'
                                    type='textarea'
                                    placeholder=''
                                    innerRef={register({required: true})}
                                    onChange={e => setValue('note', e.target.value)}
                                    className={classnames({
                                        'is-invalid': errors.note
                                    })}
                                />
                            </FormGroup>
                            <br/>
                            <Button disabled={inProgress} color='primary' outline={true}>Submit</Button>
                            <div className='my-2'>
                                <Progress color={progressColor} animated={progressAnimated}
                                          value={onUploadProgress}>{progressMeg}</Progress>
                            </div>
                        </Form>
                    </Col>
                    <Col lg='6' sm='6'>
                        <Alert className='p-1' color='warning'><RiGuideLine/> File structure guide</Alert>
                        <TreeFileView/>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}

export default CollectionForm