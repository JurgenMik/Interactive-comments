import React from 'react';
import './DeleteModal.scss';
import {Comment} from "../../interfaces";

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

    const handleDeleteUserInteraction = () => {
        switch (selected?.interaction_type) {
            case 'reply':
                const updatedReplies = comments.map(comment => {
                    if (comment.content === selected.targetComment) {
                        const updatedReplies = comment.replies.filter((reply: any) =>
                            reply.content !== selected.content
                        );
                        return {...comment, replies: updatedReplies};
                    } else {
                        return comment;
                    }
                });

                setComments(updatedReplies);
                break;
            case 'comment':
                const updatedComments = comments.filter((comment: Comment) =>
                    comment.content !== selected.content
                );

                setComments(updatedComments);
                break;
        }
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
                        onClick={handleDeleteUserInteraction}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;