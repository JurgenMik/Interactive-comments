export const setComments = jest.fn();

export const comments = [
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

export const comment =  {
    id: 3,
    content: 'Comment 3',
    score: 4,
    replies: [
        { id: 1, content: 'Reply 5', score: 0 },
        { id: 2, content: 'Reply 6', score: 0 }
    ]
}

export const reply = {
    id: 3,
    content: 'Reply 3',
    score: 4,
}
