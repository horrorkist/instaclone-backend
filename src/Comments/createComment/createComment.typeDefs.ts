export default `#graphql

    type CreateCommentResponse {
        ok: Boolean!
        error: String
        comment: Comment
    }

    type Mutation {
        createComment(photoId: Int!, payload: String!): CreateCommentResponse!
    }
`;
