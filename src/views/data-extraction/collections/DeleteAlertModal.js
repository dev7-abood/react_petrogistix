import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {updateLayout} from '@store/actions/updateLayout'
const DeleteAlertModal = ({isOpenDeleteModal, setOpenDeleteModal, collectionId}) => {

    const dispatch = useDispatch()
    const handelDeleteCollection = async _ => {
        try {
            const res = await axios.delete(`/data-exstr/delete_collection/${collectionId}/`)
            toast.success('Collection is delete')
            setOpenDeleteModal(!isOpenDeleteModal)
            dispatch(updateLayout())
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <Modal isOpen={isOpenDeleteModal} toggle={_ => setOpenDeleteModal(!isOpenDeleteModal)} centered={true}>
            <ModalHeader toggle={_ => setOpenDeleteModal(!isOpenDeleteModal)}>Delete Collection</ModalHeader>
            <ModalBody>
                <span className='text-danger'>Are you sure to delete the Collection!!</span>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handelDeleteCollection}>
                    Delete
                </Button>
                <Button color="secondary" onClick={_ => setOpenDeleteModal(!isOpenDeleteModal)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default DeleteAlertModal