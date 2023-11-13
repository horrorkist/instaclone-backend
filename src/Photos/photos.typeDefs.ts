export default `#graphql
    type Photo {
        id: Int!
        author: User!
        url: String!
        caption: String
        createdAt: String!
        updatedAt: String!
        hashtags: [Hashtag]
        likesCount: Int!
    }

    type Hashtag {
        id: Int!
        name: String!
        photos(page: Int!): [Photo]
        createdAt: String!
        updatedAt: String!
        totalPhotosCount: Int!
    }

    type Like {
        id: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`;
