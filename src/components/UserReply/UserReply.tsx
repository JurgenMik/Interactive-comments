import React, {useState} from 'react';
import {Comment} from "../../interfaces";

interface Props {
    profile: {image: any, username: string},
    replyTo: any,
    comments: Comment[],
    setComments: (comment: Comment[]) => void,
    setReplyTo: (i: any) => void
}

function UserReply({profile, replyTo, comments, setComments, setReplyTo}: Props) {

    const [reply, setReply] = useState( {
        content: "",
        createdAt: new Date().toLocaleDateString('en-GB'),
        score: 0,
        replyingTo: replyTo.replyingTo,
        user: {
            image: {
                png: profile.image.png,
                webp: profile.image.webp
            },
            username: profile.username
        }
    });

    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply({...reply, content: e.target.value});
    }

    const handleReplySubmit = () => {
        const updatedComment = comments.map(comment => {
            if (comment.content === replyTo.targetComment) {
                return {...comment,
                    replies: [...comment.replies, reply]
                };
            } else {
                return comment;
            }
        });
        setComments(updatedComment);
        setReplyTo({...replyTo, replyingTo: ""});
    }

    return (
        <div className="main-comment-container" style={{
                marginLeft: replyTo.identifier === 'reply' ? '10rem' : '',
                marginTop: '1.25rem'
            }}
        >
            <div className="avatar-container">
                <img
                    src={profile.image.png}
                    alt="user-profile"
                />
            </div>
            <div className="comment-container">
                <textarea
                    name="comment"
                    placeholder={`@${replyTo.replyingTo}, `}
                    onChange={handleReplyChange}
                />
                <button onClick={handleReplySubmit}>
                    REPLY
                </button>
            </div>
        </div>
    );
}

export default UserReply;
