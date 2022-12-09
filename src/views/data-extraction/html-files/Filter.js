import {Label, Input, Card, CardHeader, CardBody, Row, CardTitle, Col} from 'reactstrap'
import {useEffect, useState} from 'react'
import axios from 'axios'

const Filter = props => {

    const [years, setYears] = useState([])
    const [data, setData] = useState([])

    const { setCollectionId } = props
    const { setSelectYear } = props
    const { setSearch } = props
    const { setCollectionName } = props

    useEffect(_ => {

        (async _ => {
            try {
                const res = await axios.get(`/data-exstr/collection/index/?format=json&limit=10000`)
                setData(res.data.data)
            } catch (err) {
                console.log(err)
            }
        })()

        const currentYear = new Date().getFullYear();
        const years = [2018]

        for (let i = 2018; i !== currentYear; ++i) {
            years.push(i + 1)
        }
        setYears(years)

    }, [])

    return (<>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Search Filter</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md='4'>
                                <Label for='user-role'>Collections</Label>
                                <Input onChange={e => {
                                    setCollectionId(e.target.value)
                                    setCollectionName(e.nativeEvent.target[e.target.selectedIndex].text)
                                }} defaultValue={''} type='select' id='user-role' name='user-role'>
                                    <option disabled value=''>Collections</option>
                                    {data.map((el, index) => {
                                        return <option key={index} value={el._id['$oid']}>{el.dir_name}</option>
                                    })}
                                </Input>
                            </Col>
                            <Col className='my-md-0 my-1' md='4'>
                                <Label for='user-role'>Date</Label>
                                <Input onChange={e => setSelectYear(e.target.value ? `&year=${e.target.value}` : '')} defaultValue={''} type='select' id='user-role' name='user-role'>
                                    <option value=''>All</option>
                                    {years.map((el, index) => {
                                        return <option key={index} value={el}>{el}</option>
                                    })}
                                </Input>
                            </Col>
                            <Col md='4'>
                                <Label for='search'>Search</Label>
                                <Input onChange={e => setSearch(e.target.value ? `&s=${e.target.value}` : '')} defaultValue={''} type='text' id='search' name='search'>
                                    {/*<option value='subscriber'>Subscriber</option>*/}
                                    {/*<option value='editor'>Editor</option>*/}
                                    {/*<option value='maintainer'>Maintainer</option>*/}
                                    {/*<option value='author'>Author</option>*/}
                                    {/*<option value='admin'>Admin</option>*/}
                                </Input>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </>)
}

export default Filter