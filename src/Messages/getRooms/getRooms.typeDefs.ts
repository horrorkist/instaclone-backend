export default `#graphql

    type GetRoomsResponse {
        ok: Boolean!
        error: String
        rooms: [Room]
    }

    type Query {
        getRooms: GetRoomsResponse!
    }
`;
