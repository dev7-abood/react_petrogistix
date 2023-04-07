import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import axios from 'axios'
import {toast} from 'react-toastify'

const PeriodsModal = ({setOpenPeriodsModal, openPeriodsModal}) => {
    return (
        <div>
            <Modal size='lg' centered isOpen={openPeriodsModal} toggle={setOpenPeriodsModal}>
                <ModalHeader toggle={setOpenPeriodsModal}>Period Management</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input placeholder='Name'/>
                        </FormGroup>
                    </Form>

                    <Row className='my-2'>
                        <Col lg={7}>
                            <div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p role='button' className='btn-link'>Name: <strong>Quarterly evaluation</strong></p>
                                    <p>Created at: <strong>2/2/2022</strong></p>
                                    <Button className='align-self-center' color='warning'>-</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col lg={7}>
                            <div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p role='button' className='btn-link'>Name: <strong>Quarterly evaluation</strong></p>
                                    <p>Created at: <strong>2/2/2022</strong></p>
                                    <Button className='align-self-center' color='warning'>-</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button outline color="primary" onClick={setOpenPeriodsModal}>
                        Save
                    </Button>
                    <Button outline color="secondary" onClick={setOpenPeriodsModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default PeriodsModal