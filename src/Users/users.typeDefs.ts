export default `#graphql

    type MutationResponse {
        ok: Boolean!
        error: String
    }

    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
    }
`;
