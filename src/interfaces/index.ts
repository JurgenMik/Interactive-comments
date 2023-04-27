export interface Comment {
    content: string,
    createdAt: string,
    score: number,
    user: {
        image: {
            webp: string,
            png: string
        },
        username: string
    }
    replies: object[]
}