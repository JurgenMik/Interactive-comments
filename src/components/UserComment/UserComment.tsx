import React, {useRef} from 'react';
import './UserComment.scss';
import {Comment} from "../../interfaces";

interface Props {
    setComment: (comment: Comment) => void,
    setComments: (comments: Comment[]) => void,
    comment: Comment,
    comments: Comment[]
}

function UserComment({setComment, comment, comments, setComments}: Props) {

    const textAreaRef = useRef<any>(null);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment({...comment,
            content: e.target.value,
        });
    }

    const handleCommentSubmit = () => {
        let date = new Date();

        setComment({...comment,
            createdAt: date.toLocaleDateString('en-GB')
        });

        setComments([...comments, comment]);
        textAreaRef.current.value = '';
    }

    return (
        <div className="main-comment-container">
            <div className="avatar-container">
                <img
                    src={comment.user.image.png}
                    alt="user-profile"
                />
            </div>
            <div className="comment-container">
                <textarea
                    name="comment"
                    placeholder="Add a comment..."
                    ref={textAreaRef}
                    onChange={handleCommentChange}
                />
                <button onClick={handleCommentSubmit}>
                    SEND
                </button>
            </div>
        </div>
    );
}

export default UserComment;