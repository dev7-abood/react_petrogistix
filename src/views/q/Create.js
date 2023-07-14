import React, {useEffect, useState, memo} from "react"
import {
    Card, CardBody, CardHeader, Button, Form
} from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs';
import NewInput from './NewInput'
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'
import FirstRecord from "./FirstRecord"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './style.css'


const Create = props => {

    const {location} = props

    const [labelAndValue, setLabelAndValue] = useState([])
    const [data, setData] = useState(location.state.data)
    const [groupId, setGroupId] = useState(null)
    const [isNew, setIsNew] = useState(true)
    const [idsDeleteRecord, setIdsDeleteRecord] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)

    const [priorityNumbers, setPriorityNumbers] = useState([])

    const [removeIds, setRemoveIds] = useState([])

    useEffect(_ => {
        setGroupId(data.id)
    }, [data, idsDeleteRecord])

    const [questions, setQuestions] = useState([])

    const [permissionsCheckedToArray, setPermissionsCheckedToArray] = useState([])
    const [permissionsDefaultSelected, setPermissionsDefaultSelected] = useState([])

    useEffect(_ => {
        if (questions.length !== 0) {
            if (questions[0].permissions) {
                setPermissionsCheckedToArray(questions[0].permissions.split(','))
            }
        }
    }, [questions])

    useEffect(_ => {
        if (questions.length !== 0) {
            if (questions[0].permissions) {
                const data = []
                labelAndValue.map((el, index) => {
                    permissionsCheckedToArray.map((cEl) => {
                        if (el.value === cEl) {
                            data.push(index)
                        }
                    })
                })
                setPermissionsDefaultSelected(data)
            }
        }
    }, [permissionsCheckedToArray, questions])


    useEffect(_ => {
        if (groupId) {
            (async _ => {
                try {
                    const res = await axios.get(`/question/list/${groupId}/`)
                    setQuestions(res.data.data)
                    if (res.data.data.length !== 0) {
                        setIsNew(false)
                    }
                } catch (err) {

                }
            })()
        }
    }, [groupId, idsDeleteRecord, isUpdated])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/job/get_priorities/')
                setLabelAndValue(res.data.data.label_and_value)
                setPriorityNumbers(res.data.data.priority_numbers)
            } catch (err) {

            }
        })()
    }, [])

    const onAdd = _ => setNumberInputs(numberInputs + 1)

    const [numberInputs, setNumberInputs] = useState(0)

    const SignupSchema = yup.object().shape({
        // 'title.*': yup.string().required()
    })

    const {register, errors, handleSubmit, trigger} = useForm({
        resolver: yupResolver(SignupSchema)
    })

    const [showForm, setShowForm] = useState(true)
    const onSubmit = async data => {
        trigger()
        try {
            setShowForm(!showForm)
            const res = await axios.post(`/question/create/${groupId}/`, {
                ...data, ids_delete_record: removeIds
            })
            toast.success('Questions saved successfully')
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <Breadcrumbs breadCrumbTitle='Form Question' breadCrumbParent='Dashboard'
                     breadCrumbActive='Form Question'/>
        <Card>
            <CardHeader>
                <Button onClick={onAdd} color='primary' title={'Add New Question'}>+</Button>
            </CardHeader>
            <CardBody>
                <div>
                    <p><strong>Group Name</strong>: {data.name}</p>
                    <p><strong>Status</strong>: {data.status === 1 ? <span className='text-success'>Active</span> :
                        <span className='text-danger'>Disabled</span>}</p>
                </div>

                {!showForm ? <Skeleton count={5} height={'12px'}/> : ''}

                {labelAndValue.length !== 0 ? <Form action='/' className={classnames('auth-register-form mt-2', {
                    'd-none': !showForm
                })} onSubmit={handleSubmit(onSubmit)}>
                    <FirstRecord
                        questions={questions}
                        register={register}
                        isNew={isNew}
                        labelAndValue={labelAndValue}
                        permissionsDefaultSelected={permissionsDefaultSelected}
                    />
                    <div style={{zIndex: '10000 !important'}}>
                        {questions.map((el, index) => {
                            if (index !== 0) {
                                return <div key={index}>
                                    <NewInput
                                        index={index + numberInputs}
                                        numberOfInputs={questions.length}
                                        register={register}
                                        errors={errors}
                                        setIdsDeleteRecord={setIdsDeleteRecord}
                                        idsDeleteRecord={idsDeleteRecord}
                                        removeIds={removeIds}
                                        labelAndValue={labelAndValue}
                                        setRemoveIds={setRemoveIds}
                                        isNew={false}
                                        row={el}
                                        priorityNumbers={priorityNumbers}
                                        isUpdated={isUpdated}
                                    />
                                </div>
                            }
                        })}
                    </div>
                    <div style={{zIndex: '10000 !important'}}>
                        {[...Array(numberInputs)].map((el, index) => {
                            return <div key={index}>
                                <NewInput
                                    index={index + 1}
                                    numberOfInputs={numberInputs}
                                    register={register}
                                    errors={errors}
                                    setIdsDeleteRecord={setIdsDeleteRecord}
                                    idsDeleteRecord={idsDeleteRecord}
                                    removeIds={removeIds}
                                    setRemoveIds={setRemoveIds}
                                    labelAndValue={labelAndValue}
                                    priorityNumbers={priorityNumbers}
                                    isNew={true}
                                    isUpdated={isUpdated}
                                    row={{
                                        id: '',
                                        title: '',
                                        question_type: '',
                                        number_of_words: 30,
                                        right_answer: '',
                                        permissions: ''
                                    }}
                                />
                            </div>
                        })}
                    </div>
                    <div className='mr-1'>
                        <hr/>
                        <Button onClick={_ => setIsUpdated(!isUpdated)} type='submit' className='mr-1' color='primary'>
                            Save
                        </Button>
                    </div>
                </Form> : ''}
            </CardBody>
        </Card>

        {[...Array(9)].map((el, index) => {
            return <br key={index}/>
        })}
    </>)
}

export default memo(Create)