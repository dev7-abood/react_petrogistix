import {Card, CardBody, Row, Col, CustomInput, Input} from 'reactstrap'
import {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from 'axios'

const Statistics = props => {

    const {userName} = props
    const {userId} = props
    const {rating} = props

    const [data, setData] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/evaluation/get_group_evaluation/${userId}/`)
                setData(res.data.data)
            } catch (err) {

            }
        })()
    }, [])

    const columns = [{
        name: 'Group name', selector: row => row.name,
    }, {
        name: 'Period', selector: row => row.period.title,
    }, {
        name: 'Rating', selector: row => row.rating,
    }]

    const Expanded = ({data}) => {

        const [customData, setCustomData] = useState([])

        useEffect(_ => {
            (async _ => {
                try {
                    const res = await axios.get(`/evaluation/get_evl_questions/${data.id}/${userId}/`)
                    setCustomData(res.data.data)
                    console.log(res.data.data)
                } catch (err) {

                }
            })()
        }, [])

        return <div className='p-1 mr-5'>
            <Col lg={12}>
                <p><strong>Questions: </strong></p>
                {customData.map((el, index) => {
                    return <div key={index}>
                        <div className='d-flex justify-content-between my-1'>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <p><strong>{el.title}</strong></p>
                                    <p><strong>Rating: {el.answer_rating}</strong></p>
                                </div>
                                {el.answers.map((ael, i) => {
                                    return <div>
                                        {ael.question_type === 'multiple' ? <div className='d-flex mx-2'>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <div key={i}>
                                                    <CustomInput
                                                        type='radio'
                                                        className='custom-control-Primary'
                                                        id={`Primary_${Math.random()}`}
                                                        label='I agree'
                                                        defaultValue={'100'}
                                                        disabled={true}
                                                        defaultChecked={ael.answer === '100'}
                                                        inline
                                                    />
                                                    <CustomInput
                                                        type='radio'
                                                        className='custom-control-Primary'
                                                        id={`Primary_${Math.random()}`}
                                                        label='Neutral'
                                                        disabled={true}
                                                        defaultValue={'75'}
                                                        defaultChecked={ael.answer === '75'}
                                                        inline
                                                    />
                                                    <CustomInput
                                                        type='radio'
                                                        className='custom-control-Primary'
                                                        id={`Primary_${Math.random()}`}
                                                        label='Not agree'
                                                        disabled={true}
                                                        defaultValue={'50'}
                                                        defaultChecked={ael.answer === '50'}
                                                        inline
                                                    />
                                                    <CustomInput
                                                        type='radio'
                                                        className='custom-control-Primary'
                                                        id={`Primary_${Math.random()}`}
                                                        label='Strongly Disagree'
                                                        disabled={true}
                                                        defaultValue={'25'}
                                                        defaultChecked={ael.answer === '25'}
                                                        inline
                                                    />
                                                    <CustomInput
                                                        type='radio'
                                                        className='custom-control-Primary'
                                                        id={`Primary_${Math.random()}`}
                                                        label='Declined to answer'
                                                        disabled={true}
                                                        defaultValue={'0'}
                                                        defaultChecked={ael.answer === '0'}
                                                        inline
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-muted'>From: {ael.user_from_name}</p>
                                            </div>
                                        </div> : <div>
                                            <Input
                                                id={`Primary_${Math.random()}`}
                                                type='textarea'
                                                required
                                                defaultValue={`From: ${ael.user_from_name}\n${ael.answer}`}
                                                disabled={true}
                                            />
                                        </div>}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                })}
            </Col>
        </div>
    }


    return (<Card>
        <CardBody>
            <div className='mb-2'>
                <p><strong>Employee Name: {userName}</strong></p>
                <p><strong>Total user rating: {rating}</strong></p>
            </div>
            <div>
                <DataTable
                    noHeader
                    columns={columns}
                    data={data}
                    className='react-dataTable'
                    expandableRows
                    // expandableRowExpanded={row => row.defaultExpanded}
                    expandableRowsComponent={<Expanded/>}
                />
            </div>
        </CardBody>
    </Card>)
}

export default Statistics