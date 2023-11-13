export default `#graphql

    type GetHashtagResponse {
        ok: Boolean!
        error: String
        hashtag: Hashtag
    }

    type Query {
        getHashtagByName(name: String!): GetHashtagResponse!
    }
`;
