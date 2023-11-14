export default `#graphql

    type GetRoomResponse {
        ok: Boolean!
        error: String
        room: Room
    }

    type Query {
        getRoom(id: Int!): GetRoomResponse!
    }
`;
