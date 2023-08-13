import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchemaSync } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { config } from "dotenv";
import mongoose from "mongoose";
import { UserResolver } from "./resolvers/UserResolver";
import { authChecker } from "./jwt/authMiddleware";

(async ()=>{
    config()
    
    const app = express()
    const port = process.env.PORT || 3000 ;

    const schema = buildSchemaSync({
        resolvers : [
            HelloWorldResolver , 
            UserResolver 
        ] , 
        authChecker 
    }) ;

    const apolloServer = new ApolloServer({
        schema , 
        context : ({req , res})=>({req , res}) , 
        plugins: [ApolloServerPluginInlineTrace()] , 
    })


    await apolloServer.start()
    await mongoose.connect(process.env.MONGODB_URI)

    apolloServer.applyMiddleware({app , cors : false});
    app.listen(port , ()=>{
        console.clear();
        console.log(process.version);
        console.log(`app runing on http://localhost:${port}${apolloServer.graphqlPath}`);
    })
})()


