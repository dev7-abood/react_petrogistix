import DefaultSelectPermissions from "./DefaultSelectPermissions";
import SelectPermissions from "./SelectPermissions";
import {
    Input, Row, Col, Label, FormGroup
} from 'reactstrap';
import {useState, memo, useEffect} from 'react'

const FirstRecord = ({questions, register, isNew, labelAndValue, permissionsDefaultSelected}) => {

    const [questionType, setQuestionType] = useState('textarea')

    useEffect(_ => {
        console.log(questions)
        if (questions.length !== 0) {
            setQuestionType(questions[0].question_type)
        }
    }, [questions])

    return (<>
        <Row>
            <Col lg={6}>
                <FormGroup>
                    <Input
                        name={`id[0]`}
                        id={`id_0`}
                        innerRef={register({required: true})}
                        type='hidden'
                        defaultValue={questions.length !== 0 ? questions[0].id : ''}
                    />
                    <Label for='title'>
                        English title <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        required
                        name='title[0]'
                        id='title'
                        placeholder='How about ...?'
                        innerRef={register({required: true})}
                        defaultValue={questions.length !== 0 ? questions[0].title : ''}
                        autoComplete={'false'}
                    />
                </FormGroup>
            </Col>
            <Col lg={6}>
                <FormGroup>
                    <Label for='ar_title'>
                        Arabic Title <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        required
                        name='ar_title[0]'
                        id='ar_title'
                        placeholder='ماذا عن ...؟'
                        innerRef={register({required: true})}
                        defaultValue={questions.length !== 0 ? questions[0].ar_title : ''}
                        style={{direction: 'rtl'}}
                        autoComplete={'false'}
                    />
                </FormGroup>
            </Col>
            <Col lg={3}>
                <FormGroup className='mb-2'>
                    <Label for='status'>Question Type</Label>
                    <Input
                        type='select'
                        name='question_type[0]'
                        id='question_type'
                        onChange={e => setQuestionType(e.target.value)}
                        innerRef={register({required: true})}
                        value={questionType}
                    >
                        <option value='textarea'>Textarea</option>
                        <option value='multiple'>Multiple Choice</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col lg={3}>
                <FormGroup>
                    <Label for='number_of_words'>
                        # of words <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='number'
                        name='number_of_words[0]'
                        id='number_of_words'
                        innerRef={register({required: true})}
                        defaultValue={questions.length !== 0 ? questions[0].number_of_words : ''}
                        readOnly={questionType === 'multiple'}
                    />
                </FormGroup>
            </Col>
            <Col lg={4}>
                <FormGroup>
                    <Label for='permissions'>
                        Permissions <span className='text-danger'>*</span>
                    </Label>
                    <div className='position-relative'>
                        <Input
                            id={'permissions[0]'}
                            name={`permissions[0]`}
                            innerRef={register({required: true})}
                            tabIndex={-1}
                            autoComplete="off"
                            style={{opacity: 0, height: 0}}
                            required={true}
                            defaultValue={questions.length !== 0 ? questions[0].permissions : null}
                        />
                        <div className='position-absolute w-100' style={{top: 0}}>
                            {!isNew ? <DefaultSelectPermissions
                                labelAndValue={labelAndValue}
                                index={0}
                                permissionsDefaultSelected={permissionsDefaultSelected}
                            /> : <SelectPermissions
                                labelAndValue={labelAndValue}
                                index={0}
                            />}
                        </div>
                    </div>
                </FormGroup>
            </Col>
        </Row>
    </>)
}

export default memo(FirstRecord)