import {useState, memo, useEffect} from "react";
import classnames from 'classnames'
import {
    Input, Row, Col, Label, Button, FormGroup
} from 'reactstrap';
// import Select from 'react-select'
import DefaultSelectPermissions from "./DefaultSelectPermissions";
import SelectPermissions from "./SelectPermissions";

const NewInput = ({
                      index,
                      register,
                      errors,
                      row,
                      setIdsDeleteRecord,
                      idsDeleteRecord,
                      removeIds,
                      setRemoveIds,
                      labelAndValue,
                      isNew
                  }) => {

    const [visible, setVisible] = useState(true)
    const [questionType, setQuestionType] = useState('textarea')

    useEffect(_ => {
        setQuestionType(row.question_type)
    }, [row])

    const [permissionsCheckedToArray, setPermissionsCheckedToArray] = useState([])
    const [permissionsDefaultSelected, setPermissionsDefaultSelected] = useState([])

    useEffect(_ => {
        setPermissionsCheckedToArray(row.permissions.split(','))
    }, [])

    useEffect(_ => {
        if (row.permissions) {
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
    }, [permissionsCheckedToArray])

    const onRemove = _ => {
        setVisible(false)
        if (row.id !== '') {
            setRemoveIds([...removeIds, row.id])
        }
    }

    return (<div>
        {visible && labelAndValue.length !== 0 ? <div className='my-5'>
            <Input
                name={`id[${index}]`}
                id={`id_${index}`}
                innerRef={register({required: true})}
                type='hidden'
                defaultValue={row.id}
            />
            <Row className={'d-flex align-items-center'}>
                <Col lg={3}>
                    <FormGroup>
                        <Label for={`title_${index}`}>
                            Title <span className='text-danger'>*</span>
                        </Label>
                        <Input
                            required
                            name={`title[${index}]`}
                            id={`title_${index}`}
                            placeholder='How about ...?'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors[`title[${index}]`]})}
                            defaultValue={row.title}
                        />
                    </FormGroup>
                </Col>
                <Col lg={2}>
                    <FormGroup className='mb-2'>
                        <Label for={`question_type_${index}`}>Question Type</Label>
                        <Input
                            type='select'
                            name={`question_type[${index}]`}
                            id={`question_type_${index}`}
                            onChange={e => setQuestionType(e.target.value)}
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors[`question_type[${index}]`]})}
                            defaultValue={row.question_type}

                        >
                            <option value='textarea'>Textarea</option>
                            <option value='multiple'>Multiple Choice</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col lg={1} className={classnames('', {
                    'd-none': questionType === 'multiple'
                })}>
                    <FormGroup>
                        <Label for={`number_of_words_${index}`}>
                            # of words <span className='text-danger'>*</span>
                        </Label>
                        <Input
                            type='number'
                            name={`number_of_words[${index}]`}
                            id={`number_of_words_${index}`}
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors[`number_of_words_${index}`]})}
                            defaultValue={row.number_of_words}
                        />
                    </FormGroup>
                </Col>
                <Col lg={1}>
                    <FormGroup>
                        <Label for='number_of_words'>
                            Weight <span className='text-danger'>*</span>
                        </Label>
                        <Input
                            type='number'
                            name={`weight[${index}]`}
                            id='weight'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['weight']})}
                            defaultValue={parseInt(row.weight)}
                            max={5}
                            min={1}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col lg={3}>
                    <FormGroup>
                        <div className='position-relative'>
                            <Input
                                id={`permissions[${index}]`}
                                name={`permissions[${index}]`}
                                innerRef={register({required: true})}
                                tabIndex={-1}
                                autoComplete="off"
                                style={{opacity: 0, height: 0}}
                                required={true}
                                defaultValue={row.permissions}
                            />
                            <div className='position-absolute w-100' style={{top: '-2px'}}>
                                {!isNew ? <DefaultSelectPermissions
                                    labelAndValue={labelAndValue}
                                    index={index}
                                    permissionsDefaultSelected={permissionsDefaultSelected}
                                /> : <SelectPermissions
                                    labelAndValue={labelAndValue}
                                    index={index}
                                />}
                            </div>
                        </div>
                    </FormGroup>
                </Col>
                <Col lg={1}>
                    <Button onClick={_ => {
                        setIdsDeleteRecord([...idsDeleteRecord, row.id])
                        onRemove()
                        setVisible(false)
                    }} type='button' color={'warning'} title={'Remove'}>-</Button>
                </Col>
            </Row>
        </div> : ''}
    </div>)
}

export default memo(NewInput)