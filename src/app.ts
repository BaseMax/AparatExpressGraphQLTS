import "reflect-metadata";
import './middlewares/authMiddleware'

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchemaSync } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { config } from "dotenv";
import mongoose from "mongoose";
import { UserResolver } from "./resolvers/UserResolver";
import { authChecker } from "./middlewares/authMiddleware";
import passport from "passport";
import { AuthResolver } from "./resolvers/AuthResolver";

(async ()=>{
    config()
    
    const app = express()
    const port = process.env.PORT || 3000 ;

    app.use(passport.initialize())

    const schema = buildSchemaSync({
        resolvers : [
            HelloWorldResolver , 
            UserResolver  , 
            AuthResolver ,
        ] , 
        authChecker ,
        validate : false 
    }) ;

    const apolloServer = new ApolloServer({
        schema , 
        context: ({ req , res }) => ({req, res}),
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