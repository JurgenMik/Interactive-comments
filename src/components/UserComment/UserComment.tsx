import React, {useRef, useState} from 'react';
import './UserComment.scss';
import {Comment} from "../../interfaces";

interface Props {
    setComments: (comments: Comment[]) => void,
    comments: Comment[],
    profile: {image: any, username: string},
}

function UserComment({comments, setComments, profile}: Props) {

    const [comment, setComment] = useState<Comment>({
        content: "",
        createdAt: new Date().toLocaleDateString('en-GB'),
        score: 0,
        user: {
            image: {
                png: profile.image.png,
                webp: profile.image.webp
            },
            username: profile.username
        },
        replies: []
    });

    const textAreaRef = useRef<any>(null);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment({...comment,
            content: e.target.value,
        });
    }

    const handleCommentSubmit = () => {
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