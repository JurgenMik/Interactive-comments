import React, {useState} from 'react';
import {Comment} from "../../interfaces";
import {handleReplySubmit} from "../../utils/interactionUtils";

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

    const handleReplySubmitWrapper = () => {
        handleReplySubmit(setComments, comments, replyTo, reply);

        setReplyTo({...replyTo, replyingTo: ""});
    }

    const replyModalStyle = {
        marginLeft: replyTo.identifier === 'reply' && window.innerWidth > 395 ? '10rem' : '3rem',
        marginTop: '1.25rem',
        marginBottom: replyTo.identifier && window.innerWidth <= 395 ? '4.5rem' : ''
    }

    return (
        <div className="main-comment-container" style={replyModalStyle}
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
                <button onClick={handleReplySubmitWrapper}>
                    REPLY
                </button>
            </div>
        </div>
    );
}

export default UserReply;
