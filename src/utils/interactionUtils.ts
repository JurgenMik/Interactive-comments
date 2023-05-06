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