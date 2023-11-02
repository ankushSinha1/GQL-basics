import { BREAK } from 'graphql';
import { UserList,MovieList } from '../schema/fake_data.js';
import _ from 'lodash';

export const resolvers = {
    Query: {
        //User resolvers
        users: (parent, args, context, info) => {
            if (UserList) return {users: UserList};
            return {message: 'Could not find users data!'}
        },
        user: ( args)=>{
            const id = args.id
            const user = _.find(UserList, {id: Number(id)})
            return user
        },
        
        //Movie resolvers
        movies:()=>{
            if(MovieList) return {movies: MovieList}
            return {message: 'Could not find movies data!' }
        },
        movie:( args)=>{
            const movie = _.find(MovieList, {name: args.name})
            return movie
        }
    },
    User:{
        favouriteMovies: () =>{
            return _.filter(
                MovieList,
                (movie) => movie.yearOfPublication >=2009 && movie.yearOfPublication <=2025
            )
        }
    },
    Mutation:{
        createUser: (args) =>{
            const user = args.input;
            const lastid = UserList[UserList.length - 1].id
            user.id = lastid+1;
            UserList.push(user);
            return user;
        },
        updateUsername:(args)=>{
            const{id,newUsername} = args.input;
            let updatedUser;
            UserList.forEach((user)=>{
                if(user.id === Number(id)){
                    user.username = newUsername
                    updatedUser = user;
                }
            })
            return updatedUser
        },
        deleteUser:(args)=>{
            const {id} = args
            let deletedUser;
            UserList.forEach((user)=>{
                if(user.id === Number(id)){
                    UserList.splice(user,1)
                    deletedUser = user;
                    BREAK
                }
            })
            return deletedUser
        }
    },
    UsersResult: {
        __resolveType(obj){
            if(obj.users) return "UsersSuccessfulResult"
            if(obj.message) return "UsersFailureResult"
            return null
        },
    },
    MoviesResult: {
        __resolveType(obj){
            if(obj.movies) return "MoviesSuccessfulResult"
            if(obj.message) return "MoviesFailureResult"
            return null
        }
    }
};