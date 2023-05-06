import {handleDeleteUserInteraction} from "../utils/interactionUtils";
import {setComments, comments} from "../utils/mocks";

describe('Update comments by deleting a currentUser comment or reply', () => {

    test('correctly deletes a currentUser comment', () => {
        const selected = {
            interaction_type: 'comment',
            targetComment: '',
            content: 'Comment 1'
        }
        const updatedComments = handleDeleteUserInteraction(setComments, comments, selected);

        const expectedScore = 1;
        expect(updatedComments.length).toBe(expectedScore);
        expect(updatedComments).not.toContain(selected.content);
    });

    test('correctly deletes a currentUser reply', () => {
        const selected = {
            interaction_type: 'reply',
            targetComment: 'Comment 1',
            content: 'Reply 1'
        }
        const updatedComments = handleDeleteUserInteraction(setComments, comments, selected);

        const expectedScore = 1;
        expect(updatedComments[0].replies.length).toBe(expectedScore);
        expect(updatedComments[0].replies).not.toContain(selected.content);
    });

})