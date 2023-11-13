export default `#graphql

    type GetFeedResponse {
        ok: Boolean!
        error: String
        photos: [Photo]
    }

    type Query {
        getFeed(page: Int!): GetFeedResponse!
    }
`;
