import React from 'react';
import './DeleteModal.scss';
import {Comment} from "../../interfaces";
import {handleDeleteUserInteraction} from "../../utils/interactionUtils";

interface Props {
    setViewModal: (selected: object | null) => void,
    selected: any,
    setComments: (comment: Comment[]) => void,
    comments: Comment[]
}

function DeleteModal({setViewModal, selected, setComments, comments}: Props) {

    const handleModalClose = () => {
        setViewModal(null);
    }

    const handleDeleteUserInteractionWrapper = () => {
        handleDeleteUserInteraction(setComments, comments, selected);

        setViewModal(null);
    }

    return (
        <div className="main-modal-container">
            <div className="sub-modal-container">
                <h1>Delete comment</h1>
                <p>
                    Are you sure you want to delete this comment?
                    This will remove the comment and can't be undone.
                </p>
                <div className="modal-button-container">
                    <button
                        id="cancel"
                        onClick={handleModalClose}
                    >
                        NO, CANCEL
                    </button>
                    <button
                        id="submit"
                        onClick={handleDeleteUserInteractionWrapper}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;