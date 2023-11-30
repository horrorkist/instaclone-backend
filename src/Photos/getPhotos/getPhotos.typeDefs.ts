export default `#graphql
    type GetPhotosResponse {
        ok: Boolean!
        error: String
        photos: [Photo]
    }

    type Query {
        getPhotos(username: String!, page: Int!): GetPhotosResponse!
    }
`;
