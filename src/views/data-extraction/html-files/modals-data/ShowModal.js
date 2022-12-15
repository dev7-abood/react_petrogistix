import {useState, useEffect} from 'react'
import {Modal, ModalHeader, ModalBody, Row, Col} from 'reactstrap'
import axios from 'axios'
import {isObjEmpty} from "@utils";
import dateFormat  from "dateformat"

const ShowModal = props => {

    const {isOpen} = props
    const {setIsOpen} = props
    const {objectId} = props
    const {modalTitle} = props
    const {urlParameter} = props

    const toggle = () => setIsOpen(!isOpen);

    const [data, setData] = useState([])

    useEffect(_ => {
        if (objectId) {
            (async _ => {
                try {
                    const res = await axios.get(`/data-exstr/${urlParameter}/${objectId}/?format=json`)
                    setData(res.data.data)
                } catch (err) {
                    console.log(err)
                }
            })()
        }
    }, [objectId, modalTitle, urlParameter])

    return (<>
        {!isObjEmpty(data) ? <>
            <Modal  isOpen={isOpen} toggle={toggle} size='xl' scrollable={true}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <div className='mt-2'>
                        <Row>
                            {Object.keys(data).map((el, index) => {
                                return <> {el !== '_id' && el !== 'collection_z_id' && el !== 'html_file_id' ?
                                    <Col key={index} lg='6'>
                                        <p>{el}</p>
                                        <p>{el === 'Date' ? dateFormat(data[el]['$date'], "dS mmm yyyy") : JSON.stringify(data[el], null, 2)}</p>
                                        <hr/>
                                    </Col> : ''}
                                </>
                            })}
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        </> : ''}
    </>)
}

export default ShowModal