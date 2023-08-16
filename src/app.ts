import { config } from "dotenv";

config()

import "reflect-metadata";
import './jwt/jwtStrategy' ;
import express from 'express';
import mongoose from "mongoose";
import passport from "passport";
import { buildSchemaSync } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { UserResolver } from "./resolvers/UserResolver";
import { authChecker } from "./middlewares/authMiddleware";


import { AuthResolver } from "./resolvers/AuthResolver";
import { VideoResolver } from "./resolvers/VideoResolver";
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';

(async ()=>{
    const app = express()
    const port = process.env.PORT || 3000 ;


    app.use(passport.initialize());

    const schema = buildSchemaSync({
        resolvers : [
            HelloWorldResolver , 
            UserResolver  , 
            AuthResolver ,
            VideoResolver ,
        ] , 
        authChecker ,
        validate : false ,
    }) ;

    const apolloServer = new ApolloServer({
        schema , 
        context: ({ req , res }) => ({req, res}),
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginInlineTrace()] , 
        introspection: true,
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