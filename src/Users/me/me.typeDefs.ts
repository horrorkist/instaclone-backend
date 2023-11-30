export default `#graphql

    type MeResponse {
        ok: Boolean!
        me: User
        error: String
    }

    type Query {
        me: MeResponse!
    }
`;
