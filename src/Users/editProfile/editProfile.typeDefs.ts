export default `#graphql

    type Mutation {
        editProfile(
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
            bio: String
            avatar: String
        ): MutationResponse!
    }

    type Query {
        getUploadUrl: String!
    }
`;
