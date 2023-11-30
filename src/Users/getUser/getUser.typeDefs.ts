export default `#graphql

    type GetUserByUserNameResponse {
        ok: Boolean!
        user: User
        error: String
    }

    type Query {
        getUserByUserName(username: String!): GetUserByUserNameResponse!
    }
`;
