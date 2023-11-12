export default `#graphql
    type GetFollowingResult {
        ok: Boolean!
        error: String
        following: [User]
        lastId: Int
    }
    type Query {
        getFollowing(username: String!, lastId: Int!): GetFollowingResult!
    }
`;
