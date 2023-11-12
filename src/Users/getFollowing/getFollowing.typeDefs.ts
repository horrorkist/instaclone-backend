export default `#graphql
    type GetFollowingResult {
        ok: Boolean!
        error: String
        following: [User]
    }
    type Query {
        getFollowing(username: String!, lastId: Int!): GetFollowingResult!
    }
`;
