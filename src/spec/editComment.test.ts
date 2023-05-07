import {handleInteractionEditSubmit} from "../utils/interactionUtils";
import {setComments, comments} from "../utils/mocks";

const edited = 'Amazing! I totally agree.';

describe('Update a currentUser comment or reply', () => {

    test('correctly edit a currentUser comment', () => {
        const isEditing = {
            selected: true,
            target: 'Comment 2',
            repliedTo_content: '',
            identifier: 'comment'
        }

        const updatedComments = handleInteractionEditSubmit(setComments, comments, isEditing, edited);
        expect(updatedComments[1].content).toBe(edited);
    });

    test('correctly edit a currentUser reply', () => {
        const isEditing = {
            selected: true,
            target: 'Reply 1',
            repliedTo_content: 'Comment 1',
            identifier: 'reply'
        }

        const updatedComments = handleInteractionEditSubmit(setComments, comments, isEditing, edited);
        expect(updatedComments[0].replies[0].content).toBe(edited);
    });

})