import React from 'react';
import './Comments.scss';
import {Comment} from "../../interfaces";
import {BiPlus, BiMinus} from 'react-icons/bi';
import {FaReply, FaTrash} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';

interface Props {
    profile: {image: object, username: string},
    comments: Comment[],
    setComments: (comment: Comment[]) => void,
    handleSelectedComment: (content: string, identifier: string, targetComment: string | null) => void
}

function Comments({profile, comments, setComments, handleSelectedComment}: Props) {

    const handleCommentScoreChange = (targetComment: string, actionType: string) => {
        const updatedComment = comments.map(comment => {
            if (comment.content === targetComment) {
                return {...comment,
                    score: actionType === 'increment' ? ++comment.score : --comment.score
                };
            } else {
                return comment;
            }
        });
        setComments(updatedComment);
    }

    const handleReplyScoreChange = (targetComment: string, targetReply: string, actionType: string) => {
        const updatedComments = comments.map(comment => {
            if (comment.content === targetComment) {
                const updatedReplies = comment?.replies.map((reply: any) => {
                    if (reply.content === targetReply) {
                        return {...reply,
                            score: actionType === 'increment' ? ++reply.score : --reply.score
                        };
                    } else {
                        return reply;
                    }
                });
                return {...comment, replies: updatedReplies};
            } else {
                return comment;
            }
        });
        setComments(updatedComments);
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
                                    onClick={e => handleCommentScoreChange(comment.content, 'increment')}
                                />
                                <span>
                                    {comment.score}
                                </span>
                                <BiMinus
                                    id="edit-score"
                                    onClick={e => handleCommentScoreChange(comment.content, 'decrement')}
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
                                            <span id="action-edit">
                                                <MdEdit />
                                                <p>Edit</p>
                                            </span>
                                        </div>
                                        :
                                        <div className="action">
                                            <FaReply />
                                            <p>Reply</p>
                                        </div>
                                    }
                                </div>
                                <div className="content">
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        </div>
                        <div className="main-reply-container">
                            {comment?.replies?.map((reply: any) => {
                                return (
                                    <div className="sub-reply-container" key={reply.content}>
                                        <div className="score">
                                            <BiPlus
                                                id="edit-score"
                                                onClick={e => handleReplyScoreChange(comment.content, reply.content, 'increment')}
                                            />
                                            <span>
                                                {reply.score}
                                            </span>
                                            <BiMinus
                                                id="edit-score"
                                                onClick={e => handleReplyScoreChange(comment.content, reply.content, 'decrement')}
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
                                                        <span id="action-edit">
                                                            <MdEdit />
                                                            <p>Edit</p>
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="action">
                                                        <FaReply />
                                                        <p>Reply</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className="content">
                                                <p>
                                                    <span>@{reply.replyingTo} </span>
                                                    <>{reply.content}</>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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