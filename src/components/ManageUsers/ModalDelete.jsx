import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.isShow} centered
                onHide={props.handleClose}
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Proceed deleting this user - {props.dataModal.email}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={props.handleClose}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => props.confirmDeleteUser(props.dataModal)}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete
