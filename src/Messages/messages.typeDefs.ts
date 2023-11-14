export default `#graphql
    type Message {
        id: Int!
        payload: String!
        author: User!
        room: Room!
        createdAt: String!
        updatedAt: String!
    }

    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        createdAt: String!
        updatedAt: String!
        unreadMessagesCount: Int!
    }
`;
