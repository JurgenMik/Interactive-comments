import React, {useState, useEffect} from 'react';
import './Comments.scss';
import UserReply from '../UserReply/UserReply';
import {Comment} from "../../interfaces";
import {BiPlus, BiMinus} from 'react-icons/bi';
import {FaReply, FaTrash} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';
import {handleCommentScoreChange, handleReplyScoreChange} from "../../utils/interactionUtils";

interface Props {
    profile: {image: object, username: string},
    comments: Comment[],
    setComments: (comment: Comment[]) => void,
    handleSelectedComment: (content: string, identifier: string, targetComment: string | null) => void
}

function Comments({profile, comments, setComments, handleSelectedComment}: Props) {

    const [isEditing, setIsEditing] = useState({
        selected: false,
        target: '',
        repliedTo_content: '',
        identifier: ''
    });
    const [replyTo, setReplyTo] = useState({
        targetComment: '',
        replyingTo: '',
        identifier: ''
    });
    const [edited, setEditedContent] = useState(isEditing.target);

    useEffect(() => {
        setEditedContent(isEditing.target);
    }, [isEditing.target]);

    const handleCommentScoreChangeWrapper = (targetComment: string, actionType: string) => {
        handleCommentScoreChange(setComments, comments, targetComment, actionType);
    }

    const handleReplyScoreChangeWrapper = (targetComment: string, targetReply: string, actionType: string) => {
        handleReplyScoreChange(setComments, comments, targetComment, targetReply, actionType);
    }

    const handleReplyPopUp = (targetComment: string, replyingTo: string, identifier: string) => {
        setReplyTo({...replyTo, targetComment: targetComment,
            replyingTo: replyingTo,
            identifier: identifier
        });
    }

    const handleIsEditingUserInteraction = (targetComment: string, identifier: string, repliedTo: string) => {
        setIsEditing({...isEditing,
            selected: !isEditing.selected,
            target: targetComment,
            repliedTo_content: repliedTo,
            identifier: identifier
        });
    }

    const handleInteractionEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(e.target.value);
    }

    const handleInteractionEditSubmit = () => {
        switch (isEditing.identifier) {
            case 'reply': {
                const updatedComments = comments.map(comment => {
                    if (comment.content === isEditing.repliedTo_content) {
                        const updatedReplies = comment.replies.map((reply: any) => {
                            if (reply.content === isEditing.target) {
                                return {...reply, content: edited}
                            } else {
                                return reply;
                            }
                        });
                        return {...comment, replies: updatedReplies}
                    } else {
                        return comment;
                    }
                });
                setComments(updatedComments);
                break;
            }
            case 'comment': {
                const updatedComments = comments.map(comment => {
                    if (comment.content === isEditing.target) {
                        return {...comment, content: edited}
                    } else {
                        return comment;
                    }
                });
                setComments(updatedComments);
                break;
            }
        }
        setIsEditing({...isEditing, selected: false, target: ""});
    }

    return (
        <div className="main-comments-container">
            {comments?.map((comment: Comment) => {
                return (
                    <div className="sub-comments-container" key={comment.content}>
                        <div className="comment-details-container">
                            <div className="score">
                                <BiPlus
                                    id="edit-score"
                                    onClick={e => handleCommentScoreChangeWrapper(comment.content, 'increment')}
                                />
                                <span>
                                    {comment.score}
                                </span>
                                <BiMinus
                                    id="edit-score"
                                    onClick={e => handleCommentScoreChangeWrapper(comment.content, 'decrement')}
                                />
                            </div>
                            <div className="meta-details">
                                <div className="info">
                                    <img
                                        src={comment.user.image.png}
                                        alt="profile"
                                    />
                                    <p id="username">
                                        {comment.user.username}
                                    </p>
                                    {comment?.user?.username === profile?.username &&
                                        <h1>you</h1>
                                    }
                                    <p>{comment.createdAt}</p>
                                    {comment?.user?.username === profile?.username ?
                                        <div className="action">
                                            <span
                                                id="action-delete"
                                                onClick={e => handleSelectedComment(comment.content, 'comment', null)}
                                            >
                                                <FaTrash />
                                                <p>Delete</p>
                                            </span>
                                            <span
                                                id="action-edit"
                                                onClick={e => handleIsEditingUserInteraction(comment.content, 'comment', "")}
                                            >
                                                <MdEdit />
                                                <p>Edit</p>
                                            </span>
                                        </div>
                                        :
                                        <div
                                            className="action"
                                            onClick={e =>
                                                handleReplyPopUp(comment.content, comment.user.username, 'comment')
                                            }
                                        >
                                            <FaReply />
                                            <p>Reply</p>
                                        </div>
                                    }
                                </div>
                                <div className="content">
                                    {isEditing.selected && isEditing.target === comment.content ?
                                        <div className="edit-interaction-container">
                                            <textarea
                                                name="edit"
                                                value={edited}
                                                onChange={handleInteractionEditChange}
                                            />
                                            <button onClick={handleInteractionEditSubmit}>
                                                UPDATE
                                            </button>
                                        </div>
                                        :
                                        <p>{comment.content}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        {replyTo.replyingTo === comment.user.username &&
                            <UserReply
                                profile={profile}
                                replyTo={replyTo}
                                comments={comments}
                                setComments={setComments}
                                setReplyTo={setReplyTo}
                            />
                        }
                        <div className="main-reply-container">
                            {comment?.replies?.map((reply: any) => {
                                return (
                                    <>
                                    <div className="sub-reply-container" key={reply.content}>
                                        <div className="score">
                                            <BiPlus
                                                id="edit-score"
                                                onClick={e => handleReplyScoreChangeWrapper(comment.content, reply.content, 'increment')}
                                            />
                                            <span>
                                                {reply.score}
                                            </span>
                                            <BiMinus
                                                id="edit-score"
                                                onClick={e => handleReplyScoreChangeWrapper(comment.content, reply.content, 'decrement')}
                                            />
                                        </div>
                                        <div className="meta-details">
                                            <div className="info">
                                                <img
                                                    src={reply.user.image.png}
                                                    alt="profile"
                                                />
                                                <p id="username">
                                                    {reply.user.username}
                                                </p>
                                                {reply?.user?.username === profile?.username &&
                                                    <h1>you</h1>
                                                }
                                                <p>{reply.createdAt}</p>
                                                {reply?.user?.username === profile?.username ?
                                                    <div className="action">
                                                        <span
                                                            id="action-delete"
                                                            onClick={e => handleSelectedComment(reply.content, 'reply', comment.content)}
                                                        >
                                                            <FaTrash />
                                                            <p>Delete</p>
                                                        </span>
                                                        <span
                                                            id="action-edit"
                                                            onClick={e => handleIsEditingUserInteraction(reply.content, 'reply', comment.content)}
                                                        >
                                                            <MdEdit />
                                                            <p>Edit</p>
                                                        </span>
                                                    </div>
                                                    :
                                                    <div
                                                        className="action"
                                                        onClick={ e =>
                                                            handleReplyPopUp(comment.content, reply.user.username, 'reply')
                                                        }
                                                    >
                                                        <FaReply />
                                                        <p>Reply</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className="content">
                                                {isEditing.selected && isEditing.target === reply.content ?
                                                    <div className="edit-interaction-container">
                                                        <textarea
                                                            name="edit"
                                                            value={edited}
                                                            onChange={handleInteractionEditChange}
                                                        />
                                                        <button onClick={handleInteractionEditSubmit}>
                                                            UPDATE
                                                        </button>
                                                    </div>
                                                    :
                                                    <p>
                                                        <span>@{reply.replyingTo} </span>
                                                        <>{reply.content}</>
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {replyTo.replyingTo && replyTo.replyingTo === reply.user.username &&
                                        <UserReply
                                            profile={profile}
                                            replyTo={replyTo}
                                            comments={comments}
                                            setComments={setComments}
                                            setReplyTo={setReplyTo}
                                        />
                                    }
                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Comments;