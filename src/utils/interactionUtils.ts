import {Comment} from "../interfaces";

export const handleCommentScoreChange = (setComments: any, comments: any, targetComment: string, actionType: string) => {
    const updatedInteraction = comments.map((comment: any) => {
        if (comment.content === targetComment) {
            return {...comment,
                score: actionType === 'increment' ? ++comment.score : --comment.score
            };
        } else {
            return comment;
        }
    });

    setComments(updatedInteraction);

    return updatedInteraction;
}

export const handleReplyScoreChange = (setComments: any, comments: any, targetComment: string, targetReply: string, actionType: string) => {
    const updatedInteraction = comments.map((comment: any) => {
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

    setComments(updatedInteraction);

    return updatedInteraction;
}

export const handleCommentSubmit = (setComments: any, comments: any, comment: any) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments);

    return updatedComments;
}

export const handleDeleteUserInteraction = (setComments: any, comments: any, selected: {interaction_type: string, targetComment: string, content: string}) => {
    switch (selected?.interaction_type) {
        case 'reply':
            const updatedReplies = comments.map((comment: any) => {
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

            return updatedReplies;
        case 'comment':
            const updatedComments = comments.filter((comment: Comment) =>
                comment.content !== selected.content
            );

            setComments(updatedComments);

            return updatedComments;
    }
}

export const handleReplySubmit = (setComments: any, comments: any, replyTo: any, reply: any) => {
    const updatedComment = comments.map((comment: any) => {
        if (comment.content === replyTo.targetComment) {
            return {...comment,
                replies: [...comment.replies, reply]
            };
        } else {
            return comment;
        }
    });

    setComments(updatedComment);

    return updatedComment;
}