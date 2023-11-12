export default `#graphql

    type GetFollowersResult {
        ok: Boolean!
        error: String
        followers: [User]
        totalPages: Int
    }

    type Query {
        getFollowers(username: String!, page: Int!): GetFollowersResult!
    }
`;
