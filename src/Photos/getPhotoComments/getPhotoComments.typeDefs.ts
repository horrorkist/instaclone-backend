export default `#graphql
    type GetCommentsResponse {
        ok: Boolean!
        error: String
        comments: [Comment]
    }
    type Query {
        getPhotoComments(id: Int!, skip: Int!): GetCommentsResponse!
    }
`;
