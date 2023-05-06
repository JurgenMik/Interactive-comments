import {handleReplySubmit} from "../utils/interactionUtils";
import {setComments, comments, reply} from "../utils/mocks";

describe('Update a comment with a new reply', () => {

    test('correctly adds a new currentUser reply to a selected comment', () => {
        const replyTo = {
            targetComment: 'Comment 1',
            replyingTo: '',
            identifier: 'reply'
        }

        const updatedComment = handleReplySubmit(setComments, comments, replyTo, reply);

        const expectedScore = 3;
        expect(updatedComment[0].replies.length).toBe(expectedScore);
    });

})