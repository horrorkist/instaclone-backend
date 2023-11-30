export default `#graphql
    type LoginResult {
        ok: Boolean!
        token: String
        error: String
        username: String
        avatar: String
    }

    type Mutation {
        login(username: String!, password: String!): LoginResult!
    }
`;
