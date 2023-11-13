export default `#graphql
    type Query {
        getPhotoLikes(photoId: Int!): [User]
    }
`;
