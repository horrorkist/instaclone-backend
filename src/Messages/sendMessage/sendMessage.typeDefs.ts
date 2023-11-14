export default `#graphql
    type Mutation {
        sendMessage(payload: String!, roomId: Int, receiverId: Int): MutationResponse!
    }
`;
