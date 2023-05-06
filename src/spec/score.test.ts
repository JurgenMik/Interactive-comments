import {handleReplyScoreChange, handleCommentScoreChange} from "../utils/interactionUtils";
import {setComments, comments} from "../utils/mocks";

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