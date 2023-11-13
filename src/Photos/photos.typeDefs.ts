export default `#graphql
    type Photo {
        id: Int!
        author: User!
        url: String!
        caption: String
        createdAt: String!
        updatedAt: String!
        hashtags: [Hashtag]
    }

    type Hashtag {
        id: Int!
        name: String!
        photos(page: Int!): [Photo]
        createdAt: String!
        updatedAt: String!
        totalPhotosCount: Int!
    }
`;
