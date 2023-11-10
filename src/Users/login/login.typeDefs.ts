export default `#graphql
    type LoginResult {
        ok: Boolean!
        token: String
        error: String
    }

    type Mutation {
        login(userName: String!, password: String!): LoginResult
    }
`;
