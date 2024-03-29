export default `#graphql

    type GetPhotoResponse {
        ok: Boolean!
        error: String
        photo: Photo
    }

    type Query {
        getPhoto(id: Int!): GetPhotoResponse!
    }
`;
