export default `#graphql
    type SearchUsersResult {
        ok: Boolean!
        error: String
        users: [User]
        lastId: Int
    }

    type Query {
        searchUsers(keyword: String!, lastId: Int): SearchUsersResult!
    }
`;
