export default `#graphql
    
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            username: String!
            email: String!
            password: String!
        ): MutationResponse!
    }
`;
