export default `#graphql

    type SendMessageResponse {
        ok: Boolean!
        error: String
        roomId: Int
    }

    type Mutation {
        sendMessage(payload: String!, roomId: Int, receiverId: Int): SendMessageResponse!
    }
`;
