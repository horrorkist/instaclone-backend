export default `#graphql
    type Mutation {
        createComment(photoId: Int!, payload: String!): MutationResponse!
    }
`;
