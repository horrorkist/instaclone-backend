export default `#graphql

    type UploadPhotoResponse {
        ok: Boolean!
        error: String
        photo: Photo
    }

    type Mutation {
        uploadPhoto(url: String!, caption: String): UploadPhotoResponse!
    }
`;
