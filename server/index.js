import { ApolloServer } from "apollo-server";
import {typeDefs}  from './schema/type-defs.js';
import { resolvers } from "./schema/resolvers.js";

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    context: ({req}) => {
        return req;
    }
})

server.listen()
.then(({url})=>{
    console.log(`Your API is running at ${url}:)`);
})