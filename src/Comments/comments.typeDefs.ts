export default `#graphql
    type Comment {
        id: Int!
        author: User!
        photo: Photo!
        payload: String!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;
