import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User{
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favouriteMovies: [Movie]
    }
    type Query{
        users: UsersResult
        user(id:ID!): User!
        movies: MoviesResult
        movie(name: String!):Movie!
    }
    input createUserInput{
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = INDIA      
    }
    input updateUsername{
        id: ID!
        newUsername: String!
    }
    type Mutation{
        createUser(input:createUserInput!): User!
        updateUsername(input: updateUsername!): User!
        deleteUser(id:ID!):User!
    }
    type Movie{
        id:ID!
        name: String!
        yearOfPublication: Int!
        isInTheatres: Boolean!
    }
    enum Nationality{
        INDIA
        AFGHANISTAN
        PAKISTAN
        NEPAL
        CANADA
    }
    type UsersSuccessfulResult{
        users: [User!]!
    }
    type UsersFailureResult{
        message: String!
    }
    union UsersResult = UsersSuccessfulResult | UsersFailureResult
    type MoviesSuccessfulResult{
        movies: [Movie!]!
    }
    type MoviesFailureResult{
        message: String!
    }
    union MoviesResult = MoviesSuccessfulResult | MoviesFailureResult
`;