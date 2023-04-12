import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'
import {toast} from 'react-toastify'

const DuplicateModal = ({setOpenPeriodsModal, openPeriodsModal, groupId, setIsUpdate, isUpdate}) => {

    const onSubmit = async _ => {
        try {
            await axios.get(`/group/duplicate_group/${groupId}/`)
            toast.success('Group duplicated successfully ✔');
        } catch (err) {

        }
    }

    return (<div>
            <Modal size='lg' centered isOpen={openPeriodsModal} toggle={setOpenPeriodsModal}>
                <ModalHeader toggle={setOpenPeriodsModal}>Group Duplicate</ModalHeader>
                <ModalBody>
                    Are you sure do you want to duplicate this group!
                </ModalBody>
                <ModalFooter>
                    <Button outline color="primary" onClick={_ => {
                        onSubmit()
                        setOpenPeriodsModal()
                        setTimeout(_ => {
                            setIsUpdate(!isUpdate)
                        }, 1500)
                    }}>
                        Save
                    </Button>
                    <Button outline color="secondary" onClick={setOpenPeriodsModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>)
}

export default DuplicateModal