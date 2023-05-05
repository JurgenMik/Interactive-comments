import {handleReplyScoreChange, handleCommentScoreChange} from "../utils/interactionUtils";

const setComments = jest.fn();
const comments = [
    {
        id: 1,
        content: 'Comment 1',
        score: 4,
        replies: [
            { id: 1, content: 'Reply 1', score: 0 },
            { id: 2, content: 'Reply 2', score: 0 }
        ]
    },
    {
        id: 2,
        score: 6,
        content: 'Comment 2',
        replies: [
            { id: 3, content: 'Reply 3', score: 0 },
            { id: 4, content: 'Reply 4', score: 0 }
        ]
    }
];

describe('Update score of a reply or a comment', () => {

    test('correctly updates the score of a reply when the actionType is increment', () => {
        const targetComment = 'Comment 1';
        const targetReply = 'Reply 1';
        const actionType = 'increment';
        const updatedComment = handleReplyScoreChange(setComments, comments, targetComment, targetReply, actionType);
        const expectedScore = 1;
        expect(updatedComment[0].replies[0].score).toBe(expectedScore);
    });

    test('correctly updates the score of a reply when the actionType is decrement', () => {
        const targetComment = 'Comment 1';
        const targetReply = 'Reply 1';
        const actionType = 'decrement';
        const updatedComment = handleReplyScoreChange(setComments, comments, targetComment, targetReply, actionType);
        const expectedScore = 0;
        expect(updatedComment[0].replies[0].score).toBe(expectedScore);
    });

    test('correctly updates the score of a comment when the actionType is increment', () => {
        const targetComment = 'Comment 1';
        const actionType = 'increment';
        const updatedComment = handleCommentScoreChange(setComments, comments, targetComment, actionType);
        const expectedScore = 5;
        expect(updatedComment[0].score).toBe(expectedScore);
    });

    test('correctly updates the score of a comment when the actionType is decrement', () => {
        const targetComment = 'Comment 1';
        const actionType = 'decrement';
        const updatedComment = handleCommentScoreChange(setComments, comments, targetComment, actionType);
        const expectedScore = 4;
        expect(updatedComment[0].score).toBe(expectedScore);
    });

})