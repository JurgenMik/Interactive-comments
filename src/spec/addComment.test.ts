import {handleCommentSubmit} from "../utils/interactionUtils";
import {setComments, comments, comment} from "../utils/mocks";

describe('Update comments with  a new currentUser interaction', () => {

    test('correctly adds a new currentUser comment to all the comments', () => {
        const updatedComments = handleCommentSubmit(setComments, comments, comment);

        const expectedScore = 3;
        expect(updatedComments.length).toBe(expectedScore);
    });

})