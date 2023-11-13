export default `#graphql
    type Mutation {
        editComment(id: Int!, payload: String!): MutationResponse!
    }
`;
