import {useState, memo, useEffect} from "react";
import classnames from 'classnames'
import {
    Input, Row, Col, Label, CustomInput, Button, UncontrolledDropdown, DropdownToggle, Form, FormGroup
} from 'reactstrap';

const NewInput = ({index, register, errors, row, onDelete, setIdsDeleteRecord, idsDeleteRecord}) => {

    const [visible, setVisible] = useState(true)

    const [questionType, setQuestionType] = useState('textarea')

    const onRemove = _ => {
        setVisible(false)
    }

    return (<div>
            {visible ? <div>
                <Input
                    name={`id[${index}]`}
                    id={`id_${index}`}
                    innerRef={register({required: true})}
                    type='hidden'
                    defaultValue={row.id}
                />
                <Row className={'d-flex align-items-center'}>
                    <Col lg={4}>
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
                    <Col lg={2} className={classnames('', {
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
                                defaultValue={30}
                                innerRef={register({required: true})}
                                className={classnames({'is-invalid': errors[`number_of_words_${index}`]})}
                                defaultValue={row.number_of_words}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={2} className={classnames('', {
                        'd-none': questionType === 'textarea'
                    })}>
                        <FormGroup className='mb-2'>
                            <Label for={`right_answer_${index}`}>Right answer</Label>
                            <Input
                                type='select'
                                name={`right_answer[${index}]`}
                                id={`right_answer${index}`}
                                innerRef={register({required: true})}
                                className={classnames({'is-invalid': errors[`right_answer_[${index}]`]})}
                                defaultValue={row.right_answer}
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col lg={2}>
                        <Button onClick={_ => {
                            setIdsDeleteRecord([...idsDeleteRecord, row.id])
                            onRemove()
                            setVisible(false)
                        }} type='button' color={'warning'} title={'Remove'}>-</Button>
                    </Col>
                </Row>
            </div> : ''}
        </div>

    )
}

export default memo(NewInput)