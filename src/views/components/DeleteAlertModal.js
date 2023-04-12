import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'
import {toast} from 'react-toastify'

const DeleteAlertModal = ({toggle, openDeleteModal, deleteRout, setIsUpdate, isUpdate}) => {
    const onDelete = async _ => {
        try {
            await axios.delete(deleteRout)
            toast.success('Record deleted successfully ✔');
            setIsUpdate(!isUpdate)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Modal centered isOpen={openDeleteModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Alert</ModalHeader>
                <ModalBody>
                    <span className='text-danger'>Are you sure to delete this record!</span>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="danger" onClick={ _=> {
                        toggle()
                        onDelete()
                    }}>
                        Delete
                    </Button>
                    <Button outline color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteAlertModal