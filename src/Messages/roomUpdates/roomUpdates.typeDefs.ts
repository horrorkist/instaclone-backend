export default `#graphql
    type Subscription {
        roomUpdates(roomId: Int!): Message
    }
`;
